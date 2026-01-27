import express from "express";
const app = express();
const port = 3000
import {checkconnection} from "./DB/connectionDB.js"
import {checkSyncDB} from "./DB/connectionDB.js"
import userRouter from "../src/modules/user/user.controller.js"
import postRouter from "../src/modules/post/post.controller.js"
import commentRouter from "../src/modules/comment/comment.controller.js"

const bootstrap=()=>{

    app.use(express.json()) 
    app.get('/',(req,res)=> res.status(200).json({message:"hello in my app"}))
    app.use('/posts',postRouter)
    app.use('/users',userRouter)
    app.use('/comments',commentRouter)
    checkconnection();
    checkSyncDB();
   
    app.use("{/*demo}",(req,res,next)=>{
        res.status(404).json({message:`404 url ${req.originalUrl} not found`}) 
    })

    app.listen(port,()=> console.log(`Example app listening on port ${port}`))
}
export default bootstrap