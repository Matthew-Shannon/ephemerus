import {Configuration, ImagesResponse, OpenAIApi} from "openai";
import {Config} from "../core/config.js";
import * as fs from "fs";

export namespace ImageAPI {

    export interface Service {
        generateImage(msg: string): Promise<string>
    }

    export namespace Service {

        export class Impl implements Service {
            constructor(
                private readonly config: Config,
                private readonly api: OpenAIApi = new OpenAIApi(new Configuration({apiKey: config.OPEN_AI_KEY}))
            ) {}

            generateImage(msg: string): Promise<string> {
                let options = {
                    n: 1,
                    size: this.config.IMAGE_RES,
                    prompt: this.cleanQuery(msg),
                }

                return this.api
                    .createImage(options)
                    .then(_ => this.formatResponse(_?.data));
            }

            cleanQuery(data: string): string {
                //console.log(`DalleService cleanQuery pre: ${JSON.stringify(data)}`)

                let res = data.toLowerCase()
                    .replaceAll(/[`'"–.,;:!?\n\t]|self |youre |your |you /g, '')
                    .trim()

                //console.log(`DalleService cleanQuery post: ${JSON.stringify(res)}`)
                return res
            }

            formatResponse(res: ImagesResponse | undefined): string {
                return res?.data?.pop()?.url ?? this.config.SAMPLE_IMAGE
            }

        }

        export class Mock implements Service {
            constructor(private readonly config: Config) {}
            generateImage = (_: string): Promise<string> => Promise.resolve(this.config.OFFLINE_IMAGE);

        }

    }

}

