import ServiceManager from "../service/service.js";
import TextAPI from "../service/text.js";
import ImageAPI from "../service/image.js";
import {Config} from "./config.js";

export class Graph {
    constructor(
        readonly config: Config,
        readonly service: ServiceManager.Service
    ) {}

    static impl(): Graph {
        const config = Config.impl()
        return new Graph(config, new ServiceManager.Service(
            new ServiceManager.ServiceModel(config.DELAY),
            new TextAPI.Impl(config.OPEN_AI_KEY),
            new ImageAPI.Impl(config.OPEN_AI_KEY, config.publicPath())
        ))
    }

    static mock(): Graph {
        const config = Config.mock()
        return new Graph(config, new ServiceManager.Service(
            new ServiceManager.ServiceModel(config.DELAY),
            new TextAPI.Mock(),
            new ImageAPI.Mock(config.publicPath())
        ))
    }

}
