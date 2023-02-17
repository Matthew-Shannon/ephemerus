import {Express, Request, Response} from "express";
import {Config} from "../core/config.js";
import {ChatGptRequest, ChatGptResponse, ChatGptService, ChatGptServiceImpl} from "../service/chatgpt_service.js";
import {HTML} from "../core/view/html.js";
import {DalleService, DalleServiceImpl} from "../service/dalle_service.js";

export class PlayUseCase {
    constructor(private readonly vm: PlayVM) {}

    onAttach(app: Express): void {
        app.get('/play', async (req: Request, res: Response, next) =>
            await this.onCall(res, this.vm.chatGPT.buildInitialRequest()).catch(err => next(err))
        )
        app.post('/play', async (req: Request, res: Response, next) =>
            await this.onCall(res, this.vm.chatGPT.buildContinuedRequest(req)).catch(err => next(err))
        )
    }

    async onCall(res: Response, convo: ChatGptRequest): Promise<void> {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(this.vm.head() + "<div id='content'>")

        let chatgpt = await this.processChatGpt(res, convo)
        let dalle = await this.processDallE(res, chatgpt.reply)

        res.write("<div/>" + HTML.tail())
        res.end()
    }

    async processChatGpt(res: Response, convo: ChatGptRequest): Promise<ChatGptResponse> {
        res.write(`<div id="chatgpt_view">`)

        res.write(`<p>`)
        let chatGptRes = await this.vm.chatGPT.makeRequest(convo, _ => res.write(_))
        res.write(`</p>`)

        res.write(this.vm.inputSection(chatGptRes))

        res.write(`</div>`)
        return chatGptRes
    }

    async processDallE(res: Response, msg: string): Promise<string> {
        res.write(`<div id="dalle_view">`)
        res.write(HTML.spinner)

        const imageData = await this.vm.openAI.makeRequest(msg)
        res.write(`<img id="dalle_image" class="hide_during_loading" src="${imageData}" onload="showPage()" alt="todo">`)
        res.write(`</div>`)

        return imageData
    }

}

export class PlayVM {
    constructor(
        private config: Config,
        readonly app_title = config.APP_TITLE,
        readonly openAI: DalleService = new DalleServiceImpl(config),
        readonly chatGPT: ChatGptService = new ChatGptServiceImpl(config)
    ) {}

    inputSection(res: ChatGptResponse): string {
        return `
            <form id="user_input" class="hide_during_loading" action="/play" method="post" onsubmit="showLoading()">
                <input type="text" id="abc" name="action" placeholder="${this.config.INPUT_HINT}">
                <input type="hidden" id="ghi" name="parentMessageId" value="${res.id}">
                <input type="hidden" id="def" name="conversationId" value="${res.conversationId}">
            </form>
        `
    }

    head = () => HTML.head(this.app_title, this.css, this.config);

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