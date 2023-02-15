import Express from "express"
import BodyParser from "body-parser"
import Cors from "cors"
import {Config} from "./core/config.js";
import {Nav} from "./core/nav.js";

const nav: Nav = new Nav()
const app = Express()

app.use(Cors())
app.use(Express.json())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended: true}))

app.listen(Config.port, () => console.log('Listening @ '+Config.rootURL))

nav.applyUseCases(app)
