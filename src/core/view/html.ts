import {Spinner} from "./spinner.js";
import {Config} from "../config.js";
import {Header} from "./header.js";

export class HTML {
    static head = (title: string, css: string, config: Config): string => `
        <html lang="en">  
            <head>
                <title>${title}</title>
                ${this.viewport}
                ${this.baseStyle}
                ${Header.headerStyle}
                ${Spinner.spinnerScript}
                ${Spinner.spinnerStyle}
                ${css}
            </head>
            <body onload="onLoad()">
            ${Header.headerView(config)}
                
    `;

    static tail(): string {
        return `
                </body>
            </html>
        `
    }

    static readonly spinner = Spinner.loadingView

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
            
        </style>
    `

}

