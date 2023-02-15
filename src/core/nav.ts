import {LandingUseCase} from "../features/landing.js"
import {PlayUseCase} from "../features/play.js"
import {Express} from "express";

export class Nav {
    readonly landingUseCase = new LandingUseCase()
    readonly playUseCase = new PlayUseCase()

    applyUseCases(app: Express): void {
        this.landingUseCase.onAttach(app)
        this.playUseCase.onAttach(app)
    }

}
