import express from "express";
import {Graph} from "./graph";

export default class Router {

    public static apply(app: express.Application, graph: Graph) {

        app.get('/', async (req, res) => res.send("hello from http server"))

        app.get('/api', async (req, res) => res.send("hello from api server"))

        app.get('/api/initial', async (req, res, next) =>
            await graph.service.initial()
                .then(_ => res.json(_).end())
                .catch(_ => next(_))
        )

        app.post('/api/custom', async (req, res, next) =>
            await graph.service.initialCustom(req)
                .then(_ => res.json(_).end())
                .catch(_ => next(_))
        )

        app.post('/api/continue', async (req, res, next) =>
            await graph.service.continued(req)
                .then(_ => res.json(_).end())
                .catch(_ => next(_))
        )
    }

}