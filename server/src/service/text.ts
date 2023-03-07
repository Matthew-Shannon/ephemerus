import {ChatGPTAPI, ChatMessage, SendMessageOptions} from "chatgpt";

export namespace TextAPI {

    export type Request = {
        readonly action: string
        readonly promptPrefix?: string
        readonly conversationId?: string
        readonly parentMessageId?: string
    }

    export type Response = {
        readonly id?: string
        readonly text: string
        readonly conversationId?: string
        readonly parentMessageId?: string
    }

    export type Service = {
        fetchText(req: TextAPI.Request): Promise<TextAPI.Response>
    }

    export class Impl implements TextAPI.Service {
        constructor(
            private readonly key: string,
            private readonly api: ChatGPTAPI = new ChatGPTAPI({apiKey: key, debug: false}),
        ) {}

        public fetchText(req: TextAPI.Request): Promise<TextAPI.Response> {
            return Promise.resolve(req)
                .then(_ => this.cleanRequest(req))
                .then(_ => this.setOptions(_))
                .then(_ => this.api.sendMessage(req.action, _))
                .then(_ => this.formatResponse(_))
        }

        private setOptions(req: TextAPI.Request): SendMessageOptions {
            return {
                promptPrefix: req.promptPrefix,
                conversationId: req.conversationId,
                parentMessageId: req.parentMessageId,
            }
        }

        private cleanRequest(req: TextAPI.Request): TextAPI.Request {
            let cleaned = req.action.toLowerCase().replaceAll(/[`'"–.,;:!?\n\t]/g, '').trim()
            return { ...req, action: cleaned }
        }

        private formatResponse(res: ChatMessage): TextAPI.Response {
            return {
                id: res.id,
                conversationId: res.conversationId,
                parentMessageId: res.parentMessageId,
                text: res.detail.choices[0].text
                    .replace("{","")
                    .replace("}", "")
                    .split('{')[0]
                    .replace(/`/g, "")
            }
        }

    }

    export class Mock implements TextAPI.Service {
        async fetchText(req: TextAPI.Request): Promise<Response> {
            let text = [
                "You awaken in a strange and dreamlike world. ",
                "The sky is painted with swirls of color, and the landscape is lush with vibrant greenery. ",
                "Trees are twisted and distorted into strange shapes, and their trunks are scorched with arcane symbols. ",
                "Ahead of you lies an ancient castle, its towers reaching up to the heavens."
            ]
            return {
                id: "1",
                text: text.join(""),
                conversationId: "2",
                parentMessageId: "3"
            }
        }

    }

}

export default TextAPI