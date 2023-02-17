import {Config} from "../config.js";

export class Header {

    static headerView(config: Config) {
        return `
            <div id="header">
                <a href="${config.BASE_URL}" class="header_child">${config.APP_TITLE.toLowerCase()}</a>
                <a href="${config.GITHUB_LINK}" class="header_child">v${config.APP_VERSION}</a>
            </div>
        `
    }

    static readonly headerStyle = `
          <style>        
            #header {
                display: flex;
                flex-direction: row;
                padding-bottom: 4vh;
            }
            
            .header_child {
                font: 2vh "Terminal", "Courier New", monospace;
                padding: 1vh;
            }
            
        
            a : link {
              color: green;
              background-color: transparent;
              text-decoration: none;
            }
            
            a : visited {
              color: pink;
              background-color: transparent;
              text-decoration: none;
            }
            
            a : hover {
              color: red;
              background-color: transparent;
              text-decoration: underline;
            }
            
            a : active {
              color: yellow;
              background-color: transparent;
              text-decoration: underline;
            }
            
            </style>      
        `;

}