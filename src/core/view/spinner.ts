
export class Spinner {

    static readonly loadingView = `
        <div id="loader" class="show_during_load"></div>
        <p id="loading_text" class="show_during_load">thinking...</p>
    `

    static readonly spinnerStyle = `
        <style>
        
            #loader {
                width: 8vw;
                height: 8vw;
                margin: 2vh;
                border-radius: 4vw;
                border-top: 2vw solid #3498db;
                -webkit-animation: spin 2s linear infinite;
                animation: spin 2s linear infinite;
            }
            
            #loading_text {
                padding: 2vh;
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
                to { bottom:0; opacity:1 }
            }
            
            @keyframes animatebottom { 
                from { bottom:-100px; opacity:0 } 
                to { bottom:0; opacity:1 }
            }
        
        </style>
    `

    static readonly spinnerScript = `
        <script>
        
            let myVar;
            function onLoad() { 
                console.log("onLoad")
                myVar = setTimeout(showPage, 100); 
            }
            
            function showPage() {
                console.log("showPage")
                forEachApply("show_during_load", "none");
                forEachApply("hide_during_load", "block");
            }
            
            function showLoading() {
                console.log("showLoading")
                forEachApply("hide_during_load", "none");
                forEachApply("show_during_load", "block");
            }
            
            function forEachApply(className, displayState) {
                console.log("forEachApply: className: " + className + " displayState: " + displayState)
                const views = document.getElementsByClassName(className)
                for (let i = 0; i < views.length; i++) { 
                    console.log("forEachApply: i: " + i + " id: " + views.item(i).id)
                    views.item(i).style.display = displayState; 
                }
            }
            
            window.addEventListener('popstate', function(_) { 
                console.log('postate')
                window.location.href = window.location.origin 
            }, false);
            
        </script>
    `

}

