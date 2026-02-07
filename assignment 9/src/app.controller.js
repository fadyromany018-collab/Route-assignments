import express from 'express'
import 'dotenv/config';
import checkConnectionDB from'./DB/connectionDB.js'
import userRouter from "./DB/modules/user/user.controller.js"
import notesRouter from './DB/modules/notes/notes.controller.js';
const app = express()
const port =3000
const bootstrap=()=>{
app.use(express.json());
app.get ('/',(req,res)=>res.send('Hello world'))
app.use('/users', userRouter)
app.use('/notes', notesRouter)
checkConnectionDB()
app.use("{/*demo}",(req,res,next)=>{
res.status(404).json({message:`Url ${req.orginalUrl} not Found.....`})
})
app.listen(port,()=> console.log(`Example app listening on port ${port}`))
}
export default bootstrap
