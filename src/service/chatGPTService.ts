import {ChatGPTAPI, ChatMessage, SendMessageOptions} from "chatgpt";
import {Config} from "../core/config.js";
import {Request} from "express";

export interface ChatGptService {
    makeRequest(req: ChatGptRequest, onUpdate: OnUpdateCallback): Promise<ChatGptResponse>
}

export class ChatGPTServiceImpl implements ChatGptService {
    private readonly chatGptApi = new ChatGPTAPI({apiKey: Config.chatGptApiKey});

    public makeRequest(req: ChatGptRequest, onUpdate: OnUpdateCallback): Promise<ChatGptResponse> {

        let oldChatInput = ''
        let doOnUpdate = (_: any) => {

            let newChatInput = _.text.split('\`').join('')
            onUpdate(newChatInput.substring(oldChatInput.length))
            oldChatInput = newChatInput
        }

        return this.chatGptApi
            .sendMessage(req.action, req.options(doOnUpdate))
            .then(ChatGptResponse.define)
    }

}

// Types  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export type OnUpdateCallback = (data: String) => void


// Data Classes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export interface ChatGptId {
    readonly conversationId: string | undefined
    readonly parentMessageId: string | undefined
}

export class ChatGptRequest implements ChatGptId {
    private constructor(
        public readonly promptPrefix: string | undefined,
        public readonly action: string,
        public readonly conversationId: string | undefined,
        public readonly parentMessageId: string | undefined
    ) {}

    public static initialRequest(): ChatGptRequest {
        return new ChatGptRequest(
            Config.initialPrompt,
            Config.firstAction,
            undefined,
            undefined
        )
    }

    public static continuedRequest(req: Request): ChatGptRequest {
        return new ChatGptRequest(
            undefined,
            req.body.action,
            req.body.conversationId,
            req.body.parentMessageId
        )
    }

    public options(onUpdate: (update: ChatMessage) => void): SendMessageOptions {
        return {
            promptPrefix: this.promptPrefix,
            conversationId: this.conversationId,
            parentMessageId: this.parentMessageId,
            onProgress: _ => onUpdate(_)
        }
    }

}

export class ChatGptResponse implements ChatGptId {
    private constructor(
        public readonly id: string,
        public readonly reply: string,
        public readonly conversationId: string | undefined,
        public readonly parentMessageId: string | undefined
    ) { }

    public static define(chatMessage: ChatMessage): ChatGptResponse {
        return new ChatGptResponse(
            chatMessage.id,
            chatMessage.text,
            chatMessage.conversationId,
            chatMessage.parentMessageId
        )
    }
}

