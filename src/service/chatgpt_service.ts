import {ChatGPTAPI, ChatMessage, SendMessageOptions} from "chatgpt";
import {Config} from "../core/config.js";
import {Request} from "express";

export interface ChatGptService {
    buildInitialRequest(): ChatGptRequest
    buildContinuedRequest(req: Request): ChatGptRequest
    makeRequest(req: ChatGptRequest, onUpdate: (data: String) => void): Promise<ChatGptResponse>
}

export class ChatGptServiceImpl implements ChatGptService {
    constructor(
        private readonly config: Config,
        private readonly chatGptApi = new ChatGPTAPI({apiKey: config.CHATGPT_KEY})
    ) {}

    makeRequest(req: ChatGptRequest, onUpdate: (data: String) => void): Promise<ChatGptResponse> {
        //console.log(`ChatGptService makeRequest req: ${JSON.stringify(req)}`)

        let oldChatInput = ''
        let hasHitEnd = false
        let doOnUpdate = (_: any) => {
            let newChatInput: string = _.text.replaceAll(/`/g, '')
            if (hasHitEnd || newChatInput.includes('{')) { hasHitEnd = true; return; }
            onUpdate(newChatInput.substring(oldChatInput.length))
            oldChatInput = newChatInput
        }

        let options: SendMessageOptions = {
            promptPrefix: req.promptPrefix,
            conversationId: req.conversationId,
            parentMessageId: req.parentMessageId,
            onProgress: _ => doOnUpdate(_)
        }

        return this.chatGptApi
            .sendMessage(req.action, options)
            .then(_ => {
                let msg = _.text.includes('{')
                    ? _.text.substring(0, _.text.lastIndexOf('{'))
                    : _.text

                return new ChatGptResponse.FromChatMessage(_, msg)
            })
    }

    buildInitialRequest = (): ChatGptRequest => new ChatGptRequest.Initial(this.config);

    buildContinuedRequest = (req: Request): ChatGptRequest => new ChatGptRequest.Continued(req);

}

export interface ChatGptResponse {
    readonly id: string
    readonly reply: string
    readonly conversationId: string | undefined
    readonly parentMessageId: string | undefined
}

export namespace ChatGptResponse {
    export class FromChatMessage implements ChatGptResponse {
        constructor(private readonly chatMessage: ChatMessage, private readonly msg: string) {}
        readonly id = this.chatMessage.id
        readonly reply = this.msg
        readonly conversationId = this.chatMessage.conversationId
        readonly parentMessageId = this.chatMessage.parentMessageId
    }
}

export interface ChatGptRequest {
    readonly promptPrefix: string | undefined
    readonly action: string
    readonly conversationId: string | undefined
    readonly parentMessageId: string | undefined
}

export namespace ChatGptRequest {

    export class Initial implements ChatGptRequest {
        constructor(private readonly config: Config) {}
        readonly promptPrefix = this.config.INITIAL_PROMPT
        readonly action = this.config.INITIAL_ACTION
        readonly conversationId = undefined
        readonly parentMessageId = undefined
    }

    export class Continued implements ChatGptRequest {
        constructor(private readonly req: Request) {}
        readonly promptPrefix = undefined
        readonly action = this.req.body.action
        readonly conversationId = this.req.body.conversationId
        readonly parentMessageId = this.req.body.parentMessageId
    }

}