import {ServiceModule} from "../service/_module.js";
import {FeatureModule} from "../features/_module.js";
import {Config} from "./config.js";

export interface Graph {
    readonly config: Config
    readonly serviceModule: ServiceModule
    readonly featureModule: FeatureModule
}

export namespace Graph {

    export class Impl implements Graph {
        readonly config: Config = Config.def()
        readonly serviceModule: ServiceModule = new ServiceModule.Impl(this)
        readonly featureModule: FeatureModule = new FeatureModule.Impl(this)
    }

    export class Mock implements Graph {
        readonly config: Config = Config.mock()
        readonly serviceModule: ServiceModule = new ServiceModule.Mock(this)
        readonly featureModule: FeatureModule = new FeatureModule.Mock(this)
    }

}
