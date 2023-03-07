import Types from "../core/types";
import ServiceManager from "./service";

export class DataVM {
    constructor(readonly state: Types.State) {}
    private readonly serviceManager = new ServiceManager.Service(String(process.env.REACT_APP_BASE_URL))

    async onInitialClicked(): Promise<void> {
        return this.makeCall(this.serviceManager.initial())
    }

    async onInitialCustom(customSetting: string): Promise<void> {
        return this.makeCall(this.serviceManager.initialCustom(
            customSetting
        ))
    }

    async onContinueClicked(action: string): Promise<void> {
        return this.makeCall(this.serviceManager.continued(
            action,
            this.state.gameData?.conversationId ?? '',
            this.state.gameData?.id ?? '',
        ))
    }

    private async makeCall(callToMake: Promise<ServiceManager.Response>): Promise<void> {
        return Promise.resolve()
            .then(() => this.state.setLoading(true))
            .then(() => callToMake)
            .then(_ => this.state.setGameData(_))
            .catch(_ => this.state.setError(_))
            .finally(() => this.state.setLoading(false))
    }
}
