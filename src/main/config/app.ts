import express from 'express'
import {config as dotenv} from 'dotenv'
import routes from './routes'

const app = express()

app.use(express.json())

routes(app)
dotenv()
export default app