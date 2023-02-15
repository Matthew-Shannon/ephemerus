import {VM} from '../core/types.js';
import {Express, Request, Response} from "express";
import {UseCase} from "../core/types.js";
import {Config} from "../core/config.js";

export class LandingUseCase implements UseCase<LandingVM> {
    readonly vm = new LandingVM();

    onAttach(app: Express): void {
        app.get('/', async (req: Request, res: Response) => {
            req.on("close", () => res.end());
            await this.onCall(req, res)
        });
    }

    async onCall(req: Request, res: Response): Promise<void> {
        this.onDraw(req, res, this.vm)
    }

    onDraw(req: Request, res: Response, vm: LandingVM): void {
        res.write(`
            <html lang="en">  
              <head>
                <title>${vm.page_title_text}</title>
                <style>${vm.css}</style>
              </head>
              <body>${vm.content}</body>
            </html>
          `);
        res.end();
    }

}

export class LandingVM implements VM {
    readonly heading_text = 'Ephemeral.io'
    readonly subheading_text = 'Adventure Awaits'

    readonly button_url = Config.rootURL + '/play'
    readonly button_text = "Play!"

    readonly page_title_text = "Ephemeral.io"

    readonly css = `
        *, html {
          margin: 0;
          padding: 0;
          border: 0;
        }
    
        html {
          width: 100%;
          height: 100%;
        }
    
        body {
          width: 100%;
          height: 100%;
          position: relative;
          background-color: #121212;
        }
    
        .center {
          width: 100%;
          height: 50%;
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-family: "Trebuchet MS", Helvetica, sans-serif;
          text-align: center;
        }
    
        h1 {
          font-size: 144px;
        }
    
        p {
          font-size: 64px;
          margin: 32px;
        }
    
        button {
            width: 12vw;
            height: 4vw;
            font: 2vw Inconsolata, monospace;
        }
         
    `;

    readonly content = `
        <div class="center">
          <h1>${this.heading_text}</h1>
          <p>${this.subheading_text}</p>
          <a href='${this.button_url}'>
            <button>${this.button_text}</button>
          </a>
        </div>
    `;

}