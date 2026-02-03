import express from 'express'
import {checkConnectionDB} from'./DB/connectionDB.js'
import bookRouter from './DB/modules/books/books.controller.js'
import logsRouter from './DB/modules/logs/logs.controller.js'
const app = express()
const port =3000
const bootstrap=()=>{
app.use(express.json())
app.get ('/',(req,res)=>res.send('Hello world'))
app.use('/collection',bookRouter)
app.use('/logs',logsRouter)

checkConnectionDB()
app.use("{/*demo}",(req,res,next)=>{
res.status(404).json({message:`Url ${req.orginalUrl} not Found.....`})
})
app.listen(port,()=> console.log(`Example app listening on port ${port}`))
}
export default bootstrap
