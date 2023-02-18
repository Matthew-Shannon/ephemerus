import {Graph} from "../core/graph.js";
import {LandingUseCase, LandingVM} from "./landing.js";
import {PlayUseCase, PlayVM} from "./play.js";

export interface FeatureModule {
    readonly landingVM: LandingVM
    readonly landingUseCase: LandingUseCase

    readonly playVM: PlayVM
    readonly playUseCase: PlayUseCase
}

export namespace FeatureModule {

    export class Impl implements FeatureModule {
        constructor(private readonly graph: Graph) {}

        readonly landingVM = new LandingVM(this.graph.config);
        readonly landingUseCase = new LandingUseCase(this.landingVM);

        readonly playVM = new PlayVM(this.graph.config, this.graph.serviceModule.textGenerator, this.graph.serviceModule.imageGenerator);
        readonly playUseCase = new PlayUseCase(this.playVM);
    }

    export class Mock extends Impl {}

}
