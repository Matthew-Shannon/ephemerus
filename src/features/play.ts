import express, {Express} from "express";
import {Config} from "../core/config.js";
import {TextAPI} from "../service/text.js";
import {HTML} from "../core/view/html.js";
import {ImageAPI} from "../service/image.js";

export class PlayUseCase {
    constructor(private readonly vm: PlayVM) {}

    onAttach(app: Express): void {
        console.log("PlayUseCase onAttach")
        app.get('/play', async (req: express.Request, res: express.Response, next) =>
            await this.onCall(undefined, res).catch(err => next(err))
        )
        app.post('/play', async (req: express.Request, res: express.Response, next) =>
            await this.onCall(req, res).catch(err => next(err))
        )
    }

    async onCall(req: express.Request | undefined, res: express.Response): Promise<void> {
        console.log("PlayUseCase onCall")
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(this.vm.head() + "<div id='content'>")

        let convo = (req == undefined)
            ? this.vm.textApiService.buildInitialRequest()
            : this.vm.textApiService.buildContinuedRequest(req)

        let chatgpt = await this.processChatGpt(res, convo)
        let dalle = await this.processDallE(res, chatgpt.reply)

        res.write("<div/>" + HTML.tail())
        res.end()
    }

    async processChatGpt(res: express.Response, convo: TextAPI.Request): Promise<TextAPI.Response> {
        res.write(`<div id="chatgpt_view">`)

        res.write(`<p>`)
        let i = 0
        let chatGptRes = await this.vm.textApiService.generateText(convo, _ => { res.write(_);  i += 1})
        if (i == 0) res.write(chatGptRes.reply)
        res.write(`</p>`)

        res.write(this.vm.inputSection(chatGptRes))

        res.write(`</div>`)
        return chatGptRes
    }

    async processDallE(res: express.Response, msg: string): Promise<string> {
        res.write(`<div id="dalle_view">`)
        res.write(HTML.spinner)

        const imageData = await this.vm.imageApiService.generateImage(msg)
        res.write(`<img id="dalle_image" class="hide_during_loading" src="${imageData}" onload="showPage()" alt="todo">`)
        res.write(`</div>`)

        return imageData
    }

}

export class PlayVM {
    constructor(
        private config: Config,
        readonly textApiService: TextAPI.Service,
        readonly imageApiService: ImageAPI.Service,
    ) {}

    inputSection(res: TextAPI.Response): string {
        return `
            <form id="user_input" class="hide_during_loading" action="/play" method="post" onsubmit="showLoading()">
                <input type="text" id="abc" name="action" placeholder="${this.config.INPUT_HINT}">
                <input type="hidden" id="ghi" name="parentMessageId" value="${res.id}">
                <input type="hidden" id="def" name="conversationId" value="${res.conversationId}">
            </form>
        `
    }

    head = () => HTML.head(this.config.APP_TITLE, this.css, this.config);

    readonly css = `
        <style>
       
            #content {
                display: flex;
                justify-content: flex-end;
                flex-direction: column-reverse;
                align-items: center;
            }
            
            #dalle_image {
                max-width: 100%;
                height: auto;
                width: auto;
            }
            
            #dalle_view {
                width: 84vw;
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
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            p { 
                padding-left: 1vw;
            }  
            
        </style>
    `

}