import express from 'express';
import Cors from 'cors';
import BodyParser from 'body-parser';
import cookieParser from "cookie-parser";

export class Middleware {

    public apply(app: express.Express) {
        this.items.forEach(_ => app.use(_))
    }

    private items = [
        Cors(),
        cookieParser(),
        express.json(),
        BodyParser.json(),
        BodyParser.urlencoded({extended: true}),
        this.requestLogger
    ]

    private requestLogger(req: express.Request, _: express.Response, next: express.NextFunction): void {
        let title =   `\n[${req.method}] ${req.hostname} ${req.path}`
        let cookies = `\n\tcookies: ` + JSON.stringify(req.cookies)
        let params =  `\n\tparams: ` + JSON.stringify(req.params)
        let body =    `\n\tbody: ` + JSON.stringify(req.params)
        console.log(title + cookies + params + body)
        next()
    }

    private cookieSameSite(req: express.Request, _: express.Response, next: express.NextFunction): void {
        // SameSite=Strict
    }

}