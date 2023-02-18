import {Graph} from "./graph.js";
import express from "express";

export class Routes {
    constructor(private readonly graph: Graph) {}

    public apply(app: express.Express) {
        this.items.forEach(_ => _.onAttach(app))
    }

    private items = [
        this.graph.featureModule.landingUseCase,
        this.graph.featureModule.playUseCase
    ]

}
