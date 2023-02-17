import {CreateImageRequestSizeEnum} from "openai";
import * as dotenv from "dotenv";

export class Config {
    private constructor(
        readonly BASE_URL: string,
        readonly OPEN_AI_KEY: string,
    ) {}

    public static def() {
        dotenv.config() // this pulls .env into server
        return new Config(
            String(process.env.BASE_URL),
            String(process.env.OPEN_AI_KEY),
        )
    }

    readonly APP_TITLE = 'Ephemeral.io'

    readonly INITIAL_ACTION =
        'my first command is wake up in a psychedelic dream world'

    readonly INITIAL_PROMPT = `
        I want you to act as a text based adventure game. 
        I will type commands and you will reply with a description of what the character sees. 
        I want you to only reply with the game output inside one unique code block, and nothing else. 
        do not write explanations. 
        do not type commands unless I instruct you to do so. 
        when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}.`;

    readonly OFFLINE_PROMPT =
        `You wake up in a small, dimly lit room. You see a door to your left and a window to your right. {What do you want to do?}`


    readonly OFFLINE_IMAGE =
        "https://openailabsprodscus.blob.core.windows.net/private/user-3gfu9OJlOkFdTwUAqxKUzXCE/generations/generation-1zPU9amiR5rJz8P9O2jOqH5s/image.webp?st=2023-02-08T02%3A16%3A40Z&se=2023-02-08T04%3A14%3A40Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-08T00%3A57%3A15Z&ske=2023-02-15T00%3A57%3A15Z&sks=b&skv=2021-08-06&sig=GlQA4S2ndJbXsSR8e%2BmQIfLDKbQt5uUa1qqY3TFEe/8%3D"

    readonly SAMPLE_IMAGE =
        'https://archives.bulbagarden.net/media/upload/8/8e/0137Porygon.png'

    readonly IMAGE_RES =
        CreateImageRequestSizeEnum._512x512

}