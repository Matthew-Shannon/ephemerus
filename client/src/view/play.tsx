import React, {useState} from 'react'
import {ComponentErrorView, LoadingSpinner, RouterErrorView} from "../core/views";
import Types from "../core/types";
import CSS from "csstype";
import {DataVM} from "../service/datavm";

export const playRoutes: Types.RouteInjector = (vm) => {
    return [
        { path: "/play", element: <PlayView vm={vm}/>, errorElement: <RouterErrorView/> }
    ]
}

export const PlayView: React.FC<{vm: DataVM}> = ({vm}) => {
    const [value, setValue] = useState("");

    const playStyle: CSS.Properties = {
        maxWidth: "80vmax",
    }

    const dalleImageStyle: CSS.Properties = {
        maxWidth: "100%",
        height: "auto",
        width: "70vh",
        padding: 0
    }

    const dalleStyle: CSS.Properties = {
        maxWidth: "80vw",
        border: "2px solid #00ffff",
        justifyContent: "center",
        overflow: "hidden",
        padding: 0
    }

    const chatGptStyle: CSS.Properties = {
        maxWidth: "80vw",
        border: "2px solid #00ffff",
        justifyContent: "center",
        width: "70vh",
        padding: 0
    }

    const inputStyle: CSS.Properties = {
        maxWidth: "40vh",
        width: "60vw"
    }

    const onInputChange = (_: React.ChangeEvent<HTMLInputElement>) => setValue(_.target.value)
    const onSubmit = async (_: React.FormEvent) => {
        _.preventDefault();
        vm.state.setAction(value)
        await vm.onContinueClicked(value)
        setValue("")
    }

    return <div style={playStyle} id="flex_column">
        <div style={dalleStyle} id="flex_column">
            <img style={dalleImageStyle} src={vm.state.gameData?.image} alt="todo"/>
        </div>

        <div style={chatGptStyle} id="flex_column">
            <p>{vm.state.gameData?.text}</p>
            {
                vm.state.isLoading ? <LoadingSpinner msg={"Loading"}/>
                    : vm.state.error ? <ComponentErrorView err={vm.state.error}/>
                    : <form onSubmit={onSubmit}>
                        <input style={inputStyle} type="text" placeholder="I want to..." value={value} onChange={onInputChange}/>
                    </form>
            }
        </div>
    </div>
}