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

    public static mock() {
        return new Config(
            String("http://localhost"),
            String(""),
        )
    }

    readonly APP_TITLE = 'Ephemerus.io'
    readonly APP_VERSION = '1.4.0'

    readonly INPUT_HINT = "I want to..."

    readonly GITHUB_LINK = "https://github.com/Matthew-Shannon/ephemerus/blob/main/README.md"

    readonly INITIAL_ACTION =
        'my first command is wake up in an ephemeral psychedelic medieval dream world'

    readonly INITIAL_PROMPT = `
        I want you to act as a text based adventure game. 
        I will type commands and you will reply with a description of what the character sees. 
        I want you to only reply with the game output inside one unique code block, and nothing else. 
        do not write explanations. 
        do not type commands unless I instruct you to do so. 
        when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}.`;

    readonly OFFLINE_PROMPT =
        `You awaken in a strange and dreamlike world. The sky is painted with swirls of color, and the landscape is lush with vibrant greenery. Trees are twisted and distorted into strange shapes, and their trunks are scorched with arcane symbols. Ahead of you lies an ancient castle, its towers reaching up to the heavens.`

    readonly OFFLINE_IMAGE =
        "https://umbra.nascom.nasa.gov/eit/images/eclipse/eit_20010621_1730_171_half.gif"


    readonly SAMPLE_IMAGE =
        'https://archives.bulbagarden.net/media/upload/8/8e/0137Porygon.png'

    readonly IMAGE_RES =
        CreateImageRequestSizeEnum._512x512

}
