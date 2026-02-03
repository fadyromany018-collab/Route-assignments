import {Router} from "express"
import * as PS from "./logs.service.js"
const logsRouter = Router()
logsRouter.post("",PS.newLogs)

export default logsRouter