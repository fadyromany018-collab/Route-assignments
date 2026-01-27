import {postModel} from "../../DB/models/post.model.js"
import {usersModel} from "../../DB/models/user.model.js"
import Comment from "../../DB/models/comments.model.js"
import { sequelize } from '../../DB/connectionDB.js';
export const createcomments = async (req , res, next)=>{
    try{
    const {comments}=req.body
    const newComments = await Comment.bulkCreate(comments)
    res.status(201).json({ message: "comments created.", newComments });
}
    catch(error){
        return res.status(500).json({ error: "Internal Server Error" });

    }
}
export const updateCommentByID = async (req , res, next)=>{
            const {cId}=req.params
            const {userId,content}=req.body;
           
            const comment=await Comment.findByPk(cId)
              if(!comment){
            res.status(400).json({message:" wrong comment id "})
            }
            if(comment.userId==userId){
                comment.content= content;
                res.status(200).json({message:"comment updated", updated_Comment:comment})
            }
  
            res.status(400).json({message:" user doesn't exist "})
            

}
export const upsertComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
 const [comment, created] = await Comment.upsert({
      postId,
      userId,
      content
    }, {
      returning: true 
    });

    return res.status(200).json({
      comment,
      created
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
