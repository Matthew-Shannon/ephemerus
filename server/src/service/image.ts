import {Configuration, CreateImageRequest, CreateImageRequestSizeEnum, OpenAIApi} from "openai"
import {AxiosResponse} from "axios"

export namespace ImageAPI {

    export type Request = {
        readonly textDescription: string
    }

    export type Response = {
        readonly image: string
    }

    export type Service = {
        fetchImage(req: ImageAPI.Request): Promise<ImageAPI.Response>
    }

    export class Impl implements ImageAPI.Service {
        constructor(
            private readonly key: string,
            private readonly publicPath: string,
            private readonly api: OpenAIApi = new OpenAIApi(new Configuration({apiKey: key}))
        ) {}

        public fetchImage(req: ImageAPI.Request): Promise<ImageAPI.Response> {
            return Promise.resolve(req)
                .then(_ => this.cleanRequest(_))
                .then(_ => this.setOptions(_))
                .then(_ => this.api.createImage(_))
                .then(_ => this.formatResponse(_))
        }

        private setOptions(req: ImageAPI.Request): CreateImageRequest {
            return {
                n: 1,
                prompt: req.textDescription,
                size: CreateImageRequestSizeEnum._512x512
            }
        }

        private cleanRequest(req: ImageAPI.Request): ImageAPI.Request {
            let cleaned = req.textDescription.toLowerCase().replaceAll(/[`'"–.,;:!?\n\t]|self |youre |your|you /g, '').trim()
            return { ...req, textDescription: cleaned }
        }

        private formatResponse(res: AxiosResponse): ImageAPI.Response {
            let url = res?.data?.data?.pop()?.url
            return { image: url ?? this.publicPath + '/problem.png' }
        }

    }

    export class Mock implements ImageAPI.Service {
        constructor(private readonly publicPath: string) {}
        fetchImage(req: ImageAPI.Request): Promise<ImageAPI.Response> {
            return Promise.resolve({ image: this.publicPath + '/offline.png'})
        }
    }

}

export default ImageAPI