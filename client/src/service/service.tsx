
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
            private readonly baseUrl: string,
            private readonly apiUrl = baseUrl +":8080/api"
        ) {}

        initial(): Promise<ServiceManager.Response> {
            let req = this.getRequest()
            return fetch(this.apiUrl+"/initial", req).then(_ => _.json())
        }

        initialCustom(action: string): Promise<ServiceManager.Response> {
            let req = this.postRequest({action: action})
            return fetch(this.apiUrl+"/custom", req).then(_ => _.json())
        }

        continued(action: string, conversationId: string, parentMessageId: string): Promise<ServiceManager.Response> {
            let req = this.postRequest({
                action: action,
                conversationId: conversationId,
                parentMessageId: parentMessageId
            })
            return fetch(this.apiUrl+"/continue", req).then(_ => _.json())
        }

        private getRequest(): RequestInit {
            return ({ method: 'GET' })
        }

        private postRequest(body: any): RequestInit {
            return ({
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
        }

    }

}

export default ServiceManager