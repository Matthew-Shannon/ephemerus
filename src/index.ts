import Express from "express"
import {Routes} from "./core/routes.js";
import {Middleware} from "./core/middleware.js";
import {Graph} from "./core/graph.js";

const graph = new Graph.Impl()
const app = Express()

const server = app.listen(80, () => {
    console.log(`Listening @ ${graph.config.BASE_URL}`)
    new Middleware().apply(app)
    new Routes(graph).apply(app)
})

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing server')
    server.close(() => console.log('Server closed'))
})
