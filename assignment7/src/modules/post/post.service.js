import {postModel} from "../../DB/models/post.model.js"
import {usersModel} from "../../DB/models/user.model.js"
import Comment from "../../DB/models/comments.model.js"
import { sequelize } from '../../DB/connectionDB.js';
export const createPost = async (req , res, next)=>{
 try{
  const userExists = await usersModel.findByPk(req.body.userId);
  if(userExists){
        const newPost = postModel.build({
          title: req.body.title ,
          content:req.body.content ,
          userId:req.body.userId ,
        });
        await newPost.save();
        return res.status(200).json({messaage: 'post created',newPost})
     
      }
      else{
           return res.status(404).json({messaage: "user id doesn't exists" })
     
      }
      }catch(error){

        
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
       error: error.errors[0].message 
      });
    }

  }

}
export const DeleteById = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { userId } = req.body; 

 
    const post = await postModel.findByPk(id);

    
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }


    if (post.userId !== Number(userId)) {
      return res.status(403).json({ message: "You are not authorized to delete this post." });
    }


    await post.destroy();
    return res.status(200).json({ message: "Post deleted." });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getPostsDetails = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ['id', 'title'], 
      include: [
        {
          model: usersModel,
         attributes: ['id', 'name'], 
        },
        {
          model: Comment, 
          attributes: ['id', 'content'], 
        }
      ]
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};
export const getPostsWithCommentCount = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: [
        'id', 
        'title', 

        [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentCount']
      ],
     include: [{
        model: Comment,
        attributes: []
      }],
      group: ['Post.id']
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
