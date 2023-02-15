import * as dotenv from 'dotenv'
import Express from "express"
import BodyParser from "body-parser"
import Cors from "cors"
import {Nav} from "./core/nav.js";

dotenv.config()
const app = Express()
app.use(Cors())
app.use(Express.json())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended: true}))

app.listen(process.env.PORT, () => console.log('Listening @ '+process.env.ROOT_URL))

new Nav().applyUseCases(app)
