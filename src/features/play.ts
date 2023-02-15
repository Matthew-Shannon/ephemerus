import { Configuration, OpenAIApi} from "openai";
import {UseCase, VM} from "../core/types.js";
import {Express, Request, Response} from "express";
import {Config} from "../core/config.js";
import {ChatGptRequest, ChatGptResponse, Chatgpt_service, ChatGptServiceImpl} from "../service/chatgpt_service.js";

export class PlayUseCase implements UseCase<PlayVM> {

    readonly openai = new OpenAIApi(new Configuration({apiKey: process.env.DALLE_KEY}));
    readonly vm = new PlayVM()

    onAttach(app: Express): void {
        app.get('/play', async (req: Request, res: Response, next) => {
            console.log(`GET: /play `)
            let gptReq = ChatGptRequest.initialRequest()
            await this.onCall(res, gptReq).catch(err => next(err))
        });
        app.post('/play', async (req: Request, res: Response, next) => {
            console.log(`POST: /play ${JSON.stringify(req.body)}`)
            let gptReq = ChatGptRequest.continuedRequest(req)
            await this.onCall(res, gptReq).catch(err => next(err))
        });
    }

    async onCall(res: Response, convo: ChatGptRequest): Promise<void> {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(this.vm.headSection)

        await this
            .processChatGpt(res, convo)
            .then(_ => _.reply)
            .then(_ => this.processDallE(res, _))

        res.write(this.vm.tailSection)
        res.end()
    }

    async processChatGpt(res: Response, convo: ChatGptRequest): Promise<ChatGptResponse> {
        res.write(`<div id="chatgpt_view"><p>`)
        let chatGptRes = await this.vm.chatGPT.makeRequest(convo, _ => res.write(_))
        res.write(`</p> ` + this.vm.inputSection(chatGptRes) + ` </div>`)
        return chatGptRes
    }

    async processDallE(res: Response, msg: string): Promise<string> {
        res.write(`<div id="dalle_view">`)
        res.write(`<div>`)
        res.write(`<div id="loader"></div>`)
        res.write(`<p id="loading_text">thinking...</p>`)
        res.write(`</div>`)

        const imageData = await this.openai
            .createImage({prompt: msg, n: 1, size: Config.imageRes})
            .then(_ => _?.data?.data?.pop()?.url ?? Config.sampleImage);

        res.write(`<img id="dalle_image" src="${imageData}" alt="todo">`)
        res.write(`</div>`)

        return imageData
    }

}

export class PlayVM implements VM {
    public readonly chatGPT: Chatgpt_service = new ChatGptServiceImpl()

    readonly page_title_text = "Play"

    readonly css = `
       
        * { 
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    
        body {
            min-width: 100vw;
            min-height: 100vh;
            padding-top: 4vh;
            background-color: #121212;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            flex-direction: column-reverse;
            align-items: center;
        }
        
        #dalle_image {
            display: none;
            max-width: 100%;
            height: auto;
        }
        
        #dalle_view {
            width: 80vw;
            border: 2px solid #00ffff;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            flex-direction: column;
        }

        #chatgpt_view {
            width: 80vw;
            border: 2px solid #00ffff;
            padding: 2vw;
            display: flex;
            align-content: stretch;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
        }
        
        #user_input {
            display: none;
            width: auto;
         }
            
        p {
            color: #96cc8b;
            font: 2vh Inconsolata, monospace;
        }
        
        input {
            width: 16vh;
            height: 4vh;
            font: 2vw Inconsolata, monospace;
            margin-top: 1vw;
            margin-right: 1vw;
        }
        
        button {
            width: 12vh;
            height: 4vh;
            font: 2vh Inconsolata, monospace;
            margin-top: 2vw;
        }
        
        #loader {
          width: 8vw;
          height: 8vw;
          margin: 8vw;
          border: 0.75vw solid #fff00;
          border-radius: 4vw;
          border-top: 2vw solid #3498db;
          -webkit-animation: spin 2s linear infinite;
          animation: spin 2s linear infinite;
        }
        
        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Add animation to "page content" */
        .animate-bottom {
          position: relative;
          -webkit-animation-name: animatebottom;
          -webkit-animation-duration: 1s;
          animation-name: animatebottom;
          animation-duration: 1s
        }
        
        @-webkit-keyframes animatebottom {
          from { bottom:-100px; opacity:0 } 
          to { bottom:0px; opacity:1 }
        }
        
        @keyframes animatebottom { 
          from { bottom:-100px; opacity:0 } 
          to { bottom:0; opacity:1 }
        }
  `;

    readonly headSection = `
        <html lang="en">  
          <head>
            <title>Play</title>
            <style>${this.css}</style>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1" />
            <script>
                var myVar;
                
                function myFunction() {
                  myVar = setTimeout(showPage, 100);
                }
                
                function showPage() {
                  document.getElementById("loader").style.display = "none";
                  document.getElementById("loading_text").style.display = "none";
                  document.getElementById("user_input").style.display = "block"
                  document.getElementById("dalle_image").style.display = "block";
                }
                function showLoading() {
                  document.getElementById("loader").style.display = "block";
                  document.getElementById("loading_text").style.display = "block";
                  document.getElementById("user_input").style.display = "none"
                  document.getElementById("dalle_image").style.display = "none";
                }
            </script>
          </head>
          <body onload="myFunction()">
    `

    readonly tailSection = `
        </body>
      </html>
    `

    inputSection(res: ChatGptResponse): string {
        return `
            <form id="user_input" action="/play" method="post">
                <input type="text" id="abc" name="action">
                <input type="hidden" id="ghi" name="parentMessageId" value="${res.id}">
                <input type="hidden" id="def" name="conversationId" value="${res.conversationId}">
                <button type="submit" onclick="showLoading()">Submit</button>
            </form>
        `
    }

    static cleanQuery(data: string): string {
        return data.toLowerCase()
            .split(` a `).join(` `)
            .split(` you `).join(` `)
            .split(` your `).join(` `)
            .split(` yourself `).join(` `)
            .split(` the `).join(` `)
            .split(` and `).join(` `)
            .split(` do `).join(` `)
            .split(`{`).join(` `)
            .split(`}`).join(` `)
            .split(`?`).join(` `)
    }

}