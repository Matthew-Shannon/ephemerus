import {RouteObject} from "react-router-dom";
import {ServiceManager} from "../service/service";
import {DataVM} from "../service/datavm";

export namespace Types {

    export type RouteInjector = (vm: DataVM) => RouteObject[]

    export type GameData = ServiceManager.Response

    export type State = {
        readonly error?: Error
        readonly action?: string
        readonly isLoading?: boolean
        readonly gameData?: GameData
        setError: (_: Error) => void
        setAction: (_: string) => void
        setLoading: (_: boolean) => void
        setGameData: (_: GameData) => void
    }

}

export default Types
