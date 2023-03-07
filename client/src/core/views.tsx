import {useRouteError} from "react-router-dom";
import React from "react";
import CSS from "csstype";

// LoadingSpinner
export const LoadingSpinner: React.FC<{msg: string}> = ({msg}) => {
    const style: CSS.Properties = {
        width: "8vw",
        height: "6vw",
        margin: "2vh",
        borderRadius: "4vw",
        padding: 0,
        borderTop: "2vw solid #3498db",
        animation: "spin 3s linear infinite"
    }
    return <div id="flex_column">
        <div style={style}/>
        <p>...{msg}...</p>
    </div>
}


// Button
export const Button: React.FC<{txt: string,  doOnClick: () => void}> = ({txt, doOnClick}) => {
    return <button onClick={ event => {event.preventDefault(); doOnClick()}}>{txt}</button>
}


// ErrorView
export const ComponentErrorView: React.FC<{err:Error}> = (_) => <ErrorView title={"Component"} err={_.err}/>

export const RouterErrorView: React.FC = () => <ErrorView title={"Router"} err={useRouteError()}/>

const ErrorView: React.FC<{title: string, err: any}> = ({title, err}) => {
    const titleText = title + "Error : "
    const msgText = err + ""
    console.error(err);
    return <div><h1>{titleText}</h1><p>{msgText}</p></div>;
}


// HeaderView
export const HeaderView: React.FC = () => {
    const headerStyle: CSS.Properties = { display: "flex",  alignSelf: "start", padding: 0 }
    const childStyle: CSS.Properties = { color: "white",  fontSize: "1.5vmax", paddingTop: 0 }
    const homeText = "ephemerus"
    return <div id="header" style={headerStyle}>
        <a style={childStyle} href="/">home</a>
        <p style={childStyle}>{homeText}</p>
        {/*<p style={childStyle}>v{props.infoState.appVersion}</p>*/}
    </div>
}
