import {Express, Request, Response} from "express";
import {Config} from "../core/config.js";
import {HTML} from "../core/view/html.js";

export class LandingUseCase {
    constructor(private readonly vm: LandingVM) {}

    onAttach(app: Express): void {
        console.log("LandingUseCase onAttach")
        app.get('/', async (req: Request, res: Response, next) =>
            await this.onCall(req, res).catch(err => next(err))
        )
    }

    async onCall(req: Request, res: Response): Promise<void> {
        console.log("LandingUseCase onCall")
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(`
            ${this.vm.head()}
            ${this.vm.content}
            ${HTML.tail()}
        `)
        res.end()
    }

}

export class LandingVM {
    constructor(
        private config: Config,
    ) {}

    readonly title_text = this.config.APP_TITLE
    readonly subheading_text = 'Adventure Awaits'
    readonly button_url = this.config.BASE_URL + '/play'
    readonly button_text = "Play!"

    readonly content = `
        <div id="content">
            <h1>${this.config.APP_TITLE}</h1>
            <p>${this.subheading_text}</p>
            <a href='${this.button_url}' class="hide_during_load">
                <button onclick="showLoading()">${this.button_text}</button>
            </a>      
            ${HTML.spinner}
        </div>
    `

    head = () => HTML.head(this.title_text, this.css, this.config);

    readonly css =`
        <style>
            
            #content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

             h1 {
                padding: 2vh;
                padding-top: 32vh;
            }
            
            p {
                padding: 2vh;
            }
            
            button {
                min-height: 6vh;
                min-width: 12vh;
            }
            
        </style>
    `

}