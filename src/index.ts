import Express from "express"
import BodyParser from "body-parser"
import Cors from "cors"
import {Nav} from "./core/nav.js";
import {Config} from "./core/config.js";
import {requestLogger} from "./core/middleware.js";

const config = Config.def()
const app = Express()

app.use(Cors())
app.use(Express.json())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended: true}))
app.use(requestLogger)

const server = app.listen(80, () => {
    console.log(`Listening @ ${config.BASE_URL}`)
    Nav.define(config).applyRoutes(app)
})

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing server')
    server.close(() => console.log('Server closed'))
})
