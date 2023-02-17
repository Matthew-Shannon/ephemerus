import {Spinner} from "./spinner.js";

export class HTML {
    static head(title: string, css: string): string {
        return `
            <html lang="en">  
                <head>
                    <title>${title}</title>
                    ${this.viewport}
                    ${this.baseStyle}
                    ${Spinner.spinnerScript}
                    ${Spinner.spinnerStyle}
                    ${css}
                </head>
                <body onload="onLoad()">
        `
    }

    static tail(): string {
        return `
                </body>
            </html>
        `
    }

    static readonly spinner = Spinner.loadingView

    static readonly spacer = `<div id="spacer"></div>`
    static readonly loadingSpacer = `<div id="spacer" class="show_during_load"></div>`



    private static readonly viewport = `
        <meta 
            name="viewport" 
            content="width=device-width, 
            height=device-height, 
            initial-scale=1, 
            minimum-scale=1, 
            maximum-scale=1" 
        />
    `

    private static readonly baseStyle = `
        <style>
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
                background-color: #121212;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
             
            h1 {
                color: #96cc8b;
                font: 6vh "Terminal", "Courier New", monospace;
            }
            
            p {
                color: #96cc8b;
                font: 2vh "Terminal", "Courier New", monospace;
            }
            
            button {
                padding: 0.5vh;
            }
            
            input {
                padding: 0.5vh;
            }
            
            form {
                padding: 1vh;
            }
            
            #spacer {
                margin: 2vh;
            }
            
        </style>
    `

}

