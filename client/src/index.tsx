import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppView} from "./view/app"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <AppView />
    </React.StrictMode>
)