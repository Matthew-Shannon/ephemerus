import React, {useState} from 'react'
import CSS from "csstype";
import {Button, ComponentErrorView, LoadingSpinner, RouterErrorView} from "../core/views";
import { Navigate } from "react-router-dom";
import {DataVM} from "../service/datavm";
import Types from "../core/types";

export const landingRoutes: Types.RouteInjector = (vm) => {
    return [
        { path: "/", element: <LandingView vm={vm} isCustom={false}/>, errorElement: <RouterErrorView/> },
        { path: "/custom", element: <LandingView vm={vm} isCustom={true}/>, errorElement: <RouterErrorView/> }
    ]
}

export const LandingView: React.FC<{ vm: DataVM, isCustom: boolean}> = ({vm, isCustom}) => {
    const [customLocation, setCustomLocation] = useState<string>("")

    const hintText = "Story Location..."

    const landingStyle: CSS.Properties = {
        maxWidth: "80vmax",
        paddingTop: "6vmax"
    }

    const onStartClick = async () => await vm.onInitialClicked()
    const onApplyClick = async () => await vm.onInitialCustom(customLocation)
    const onInputChange = (_: React.ChangeEvent<HTMLInputElement>) => setCustomLocation(_.target.value)

    return <div style={landingStyle} id="flex_column">
        <h1 style={{fontSize: "4vmax"}}>Ephemerus.io</h1>
        <p style={{fontSize: "2.5vmax"}}>Adventure Awaits</p>
        {
            vm.state.isLoading ? <LoadingSpinner msg={"Loading"}/>
            : vm.state.error ? <ComponentErrorView err={vm.state.error}/>
            : vm.state.gameData ? <Navigate to="/play" replace={false} />
            : !isCustom ? <Button txt={"Start"} doOnClick={onStartClick}/>
            : <>
                  <input type="text" placeholder={hintText} onChange={onInputChange}/>
                  <Button txt={"Apply"} doOnClick={onApplyClick}/>
              </>
        }
    </div>
}