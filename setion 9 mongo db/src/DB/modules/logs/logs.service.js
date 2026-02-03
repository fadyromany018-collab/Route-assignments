
import logModel from "../../models/logs.model.js"

export const newLogs=async (req,res,next)=>{

  if (req.body!=""){
   const logs = await logModel.insertOne(req.body); 
    return res.status(200).json({messsage:"done",logs})}
    else{
      return res.status(400).json({messsage:"this is an empty title"})
    }
}