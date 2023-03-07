import {createBrowserRouter, RouterProvider} from "react-router-dom"
import React, {useState} from "react"
import {landingRoutes} from "./landing";
import Types from "../core/types";
import {playRoutes} from "./play";
import {HeaderView} from "../core/views";
import {DataVM} from "../service/datavm";

export const AppView: React.FC = () => {
    const [errorState, updateError] = useState<Error>();
    const [actionState, updateAction] = useState<string>();
    const [loadingState, updateLoading] = useState<boolean>();
    const [gameDataState, updateGameData] = useState<Types.GameData>();

    const vm = new DataVM({
        error: errorState,
        action: actionState,
        isLoading: loadingState,
        gameData: gameDataState,
        setError: updateError,
        setAction: updateAction,
        setLoading: updateLoading,
        setGameData: updateGameData
    })

    return <div className="maxed" id="flex_column">
        <HeaderView></HeaderView>
        <RouterProvider router={createBrowserRouter([
            ...landingRoutes(vm),
            ...playRoutes(vm),
        ])} />
    </div>
}
