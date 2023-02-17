import {LandingUseCase, LandingVM} from "../features/landing.js"
import {PlayUseCase, PlayVM} from "../features/play.js"
import {Express} from "express";
import {Config} from "./config.js";

export class Nav {

    static define(config: Config): Nav {
        return new Nav(
            new LandingUseCase(new LandingVM(config)),
            new PlayUseCase(new PlayVM(config))
        )
    }

    private constructor(
        readonly landingUseCase: LandingUseCase,
        readonly playUseCase: PlayUseCase
    ) { }

    applyRoutes(app: Express): void {
        this.landingUseCase.onAttach(app)
        this.playUseCase.onAttach(app)
    }

}
