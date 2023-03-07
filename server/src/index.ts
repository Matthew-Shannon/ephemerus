import http from "http";
import express, {Application} from "express";
import {Graph} from "./core/graph.js";
import Middleware from "./core/middleware.js";
import Router from "./core/router.js";
import {AddressInfo} from "net";

const graph: Graph = Graph.impl()
const app: Application = express();

Middleware.apply(app)
Router.apply(app, graph)

const server: http.Server = http.createServer(app)
server.listen(8080, () => {
    let port = (server.address() as AddressInfo)?.port
    console.log('Listening: %s', `${process.env.BASE_URL}:${port}`)
})
process.on('SIGTERM', () => server.close())
