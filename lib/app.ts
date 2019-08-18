import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './routes'
import { Middlewares } from './middlewares'
import * as mongoose from 'mongoose'

class App {

    public app: express.Application = express()
    public router: Routes = new Routes()
    public middleware: Middlewares = new Middlewares()
    public mongoUrl: string = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`

    constructor() {
        this.config()
        this.mongoSetup()
        this.middleware.middlewares(this.app)
        this.router.routes(this.app)
    }

    private config(): void {
        this.app.use(bodyParser.json()) // support application/json type post data
        this.app.use(bodyParser.urlencoded({ extended: false })) // support application/x-www-form-urlencoded post data
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true})     
    }

}

export default new App().app