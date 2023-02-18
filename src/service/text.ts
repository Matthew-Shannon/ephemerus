import {Config} from "../core/config.js";
import express from "express";
import {ChatGPTAPI, ChatMessage, SendMessageOptions} from "chatgpt";

export namespace TextAPI {

    export interface Service {
        buildInitialRequest(): TextAPI.Request
        buildContinuedRequest(req: express.Request): TextAPI.Request
        generateText(req: TextAPI.Request, onUpdate: (data: String) => void): Promise<Response>
    }

    export namespace Service {

        export class Impl implements Service {
            constructor(
                private readonly config: Config,
                private readonly api: ChatGPTAPI = new ChatGPTAPI({apiKey: config.OPEN_AI_KEY}),
            ) {}

            async generateText(req: TextAPI.Request, onUpdate: (data: String) => void): Promise<TextAPI.Response> {
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

                return this.api
                    .sendMessage(req.action, options)
                    .then(_ => {
                        let msg = _.text.includes('{')
                            ? _.text.substring(0, _.text.lastIndexOf('{'))
                            : _.text

                        return Response.fromChat(_, msg)
                    })
            }

            buildInitialRequest(): Request {
                return TextAPI.Request.initial(this.config);
            }

            buildContinuedRequest(req: express.Request): Request {
                return TextAPI.Request.continued(req);
            }

        }

        export class Mock implements Service {
            constructor(private readonly config: Config) {}

            buildInitialRequest(): TextAPI.Request {
                return {
                    promptPrefix: this.config.INITIAL_PROMPT,
                    action: this.config.INITIAL_ACTION,
                    conversationId: undefined,
                    parentMessageId: undefined
                }
            }

            buildContinuedRequest(req: express.Request): TextAPI.Request {
                return {
                    promptPrefix: undefined,
                    action: "",
                    conversationId: undefined,
                    parentMessageId: undefined,
                }
            }

            async generateText(req: TextAPI.Request, onUpdate: (data: String) => void): Promise<TextAPI.Response> {
                return {
                    id : '',
                    reply: this.config.OFFLINE_PROMPT,
                    conversationId: undefined,
                    parentMessageId: undefined
                }
            }

        }

    }

    // REQUEST
    export interface Request {
        readonly action: string
        readonly promptPrefix: string | undefined
        readonly conversationId: string | undefined
        readonly parentMessageId: string | undefined
    }

    export namespace Request {

        export function initial(config: Config): TextAPI.Request {
            return {
                action: config.INITIAL_ACTION,
                promptPrefix: config.INITIAL_PROMPT,
                conversationId: undefined,
                parentMessageId: undefined,
            }
        }

        export function continued(req: express.Request): TextAPI.Request {
            return {
                action: req.body.action,
                promptPrefix: undefined,
                conversationId: req.body.conversationId,
                parentMessageId: req.body.parentMessageId,
            }
        }
    }

    // RESPONSE
    export interface Response {
        readonly id: string
        readonly reply: string
        readonly conversationId: string | undefined
        readonly parentMessageId: string | undefined
    }

    export namespace Response {
        export function fromChat(chatMessage: ChatMessage, msg: string): TextAPI.Response {
            return {
                reply: msg,
                id: chatMessage.id,
                conversationId: chatMessage.conversationId,
                parentMessageId: chatMessage.parentMessageId
            };
        }
    }

}



