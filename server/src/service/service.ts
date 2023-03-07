import {TextAPI} from "./text.js"
import {ImageAPI} from "./image.js";
import * as express from "express";
import {setTimeout} from "timers/promises";

export namespace ServiceManager {

    export type Response = {
        readonly text: string
        readonly image: string,
        readonly id?: string,
        readonly conversationId?: string,
        readonly parentMessageId?: string
    }

    export class Service {
        constructor(
            protected readonly serviceModel: ServiceModel,
            private readonly textApi: TextAPI.Service,
            private readonly imageApi: ImageAPI.Service,
        ) {}

        private async makeCall(req: TextAPI.Request): Promise<ServiceManager.Response> {
            console.log('\nmakeCall: request: %s', JSON.stringify(req, null, 4))
            let textRes = await this.textApi.fetchText(req)
            let imageRes = await this.imageApi.fetchImage({textDescription: textRes.text})
            let res = await setTimeout(this.serviceModel.delay, ({...textRes, ...imageRes}))
            console.log('\nmakeCall: response: %s', JSON.stringify(res, null, 4))
            return res
        }

        public async initial(): Promise<ServiceManager.Response> {
            return this.makeCall({
                action: this.serviceModel.defaultAction,
                promptPrefix: this.serviceModel.initialPrompt
            })
        }

        public async initialCustom(req: express.Request): Promise<ServiceManager.Response> {
            return this.makeCall({
                action: this.serviceModel.firstActionFormat + req.body.action,
                promptPrefix: this.serviceModel.initialPrompt,
            })
        }

        public async continued(req: express.Request): Promise<ServiceManager.Response> {
            return this.makeCall({
                action: req.body.action,
                conversationId: req.body.conversationId,
                parentMessageId: req.body.parentMessageId,
            })
        }

    }

    export class ServiceModel {
        constructor(readonly delay: number) {}
        readonly firstActionFormat = `my first command is I wake up at `
        readonly defaultAction = this.firstActionFormat + 'in an ephemeral psychedelic medieval dream world'

        readonly initialPrompt = [
            "I want you to act as a text based adventure game",
            "I will type commands and you will reply with a description of what the character sees",
            "I want you to only reply with the game output inside one unique code block, and nothing else",
            "Do not write explanations",
            "Do not type commands unless I instruct you to do so",
            "When I need to tell you something in english, I will do so by putting text inside curly brackets {like this}"
        ].join(". ")
    }

}

export default ServiceManager
