import {ImageAPI} from "./image.js";
import {TextAPI} from "./text.js";
import {Graph} from "../core/graph.js";

export interface ServiceModule {
    readonly textGenerator: TextAPI.Service
    readonly imageGenerator: ImageAPI.Service
}

export namespace ServiceModule {

    export class Impl implements ServiceModule  {
        constructor(private readonly graph: Graph) {}
        readonly textGenerator = new TextAPI.Service.Impl(this.graph.config)
        readonly imageGenerator = new ImageAPI.Service.Impl(this.graph.config)
    }

    export class Mock implements ServiceModule {
        constructor(private readonly graph: Graph) {}
        readonly imageGenerator = new ImageAPI.Service.Mock(this.graph.config)
        readonly textGenerator = new TextAPI.Service.Mock(this.graph.config)
    }

}
