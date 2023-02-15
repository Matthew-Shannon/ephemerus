import {CreateImageRequestSizeEnum} from "openai";

export class Config {
    static port = process.env.PORT || 8000
    static baseURL = 'http://192.168.0.151'
    static rootURL = Config.baseURL + ':' + Config.port
    static sampleImage = 'https://archives.bulbagarden.net/media/upload/8/8e/0137Porygon.png'
    static chatGptApiKey = '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'
    static dalleApiKey = 'sess-KkC5AD8ybMEsU4fxgIlYbsTKLIeF6GLUgdrv2AQS'

    static initialPrompt = `
        I want you to act as a text based adventure game. 
        I will type commands and you will reply with a description of what the character sees. 
        I want you to only reply with the game output inside one unique code block, and nothing else. 
        do not write explanations. 
        do not type commands unless I instruct you to do so. 
        when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}.`;

    static firstAction = 'my first command is wake up'

    static samplePrompt = `You wake up in a small, dimly lit room. You see a door to your left and a window to your right. {What do you want to do?}`

    static sampleDallEImage = "https://openailabsprodscus.blob.core.windows.net/private/user-3gfu9OJlOkFdTwUAqxKUzXCE/generations/generation-1zPU9amiR5rJz8P9O2jOqH5s/image.webp?st=2023-02-08T02%3A16%3A40Z&se=2023-02-08T04%3A14%3A40Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-08T00%3A57%3A15Z&ske=2023-02-15T00%3A57%3A15Z&sks=b&skv=2021-08-06&sig=GlQA4S2ndJbXsSR8e%2BmQIfLDKbQt5uUa1qqY3TFEe/8%3D"

    static imageRes = CreateImageRequestSizeEnum._512x512

}