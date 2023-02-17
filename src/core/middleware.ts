import {NextFunction, Request, Response} from "express";


export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`
        [${req.method}] ${req.hostname} ${req.path}  => 
        cookies: ${JSON.stringify(req.cookies)}
        params: ${JSON.stringify(req.params)}
        body: ${JSON.stringify(req.body)}
    `)
    next()
}
