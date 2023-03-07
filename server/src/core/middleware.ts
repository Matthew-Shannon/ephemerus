import express from "express";
import BodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

export default class Middleware {

    public static apply(app: express.Application) {
        this.items.forEach(_ => app.use(_))
    }

    private static items = [
        cors(),
        express.json(),
        cookieParser(),
        BodyParser.json(),
        BodyParser.urlencoded({extended: true}),
        Middleware.logRequests,
        express.static('public'),
    ]


   private static logRequests(req: express.Request, res: express.Response, next: express.NextFunction) {
        const dump = [
            req.method+" "+req.path,
            'cookies:'+JSON.stringify(req.cookies),
            'params:'+JSON.stringify(req.params),
            'body:'+JSON.stringify(req.body),
        ].join("\n")
        console.log(dump)
        next()
    }


}