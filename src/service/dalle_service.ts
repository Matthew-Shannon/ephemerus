import {Config} from "../core/config.js";
import {Configuration, ImagesResponse, OpenAIApi} from "openai";

export interface DalleService {
    makeRequest(msg: string): Promise<string>
}

export class DalleServiceImpl implements DalleService {
    constructor(
        private readonly config: Config,
        private readonly openAiApi = new OpenAIApi(new Configuration({apiKey: config.DALLE_KEY}))
    ) {}

    makeRequest(msg: string): Promise<string> {


        let prompt = this.cleanQuery(msg)
        console.log(`DalleService makeRequest msg: ${JSON.stringify(prompt)}`)

        let options = {
            n: 1,
            size: this.config.IMAGE_RES,
            prompt: prompt,
        }

        return this.openAiApi
            .createImage(options)
            .then(_ => this.formatResponse(_?.data));
    }

    cleanQuery(data: string): string {
        return data.toLowerCase()
            .replaceAll(/['`.,;:!?\n\t]|self |youre |your |you /g, '')
            .trim()
    }

    formatResponse(res: ImagesResponse | undefined): string {
        return res?.data?.pop()?.url ?? this.config.SAMPLE_IMAGE
    }

}