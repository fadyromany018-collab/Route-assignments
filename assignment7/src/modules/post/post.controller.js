import {Router} from "express"
import {createPost,DeleteById,getPostsDetails,getPostsWithCommentCount} from "../post/post.service.js"
const postRouter = Router();
postRouter.post('/post',createPost)
postRouter.delete('/:id',DeleteById)
postRouter.get('/details',getPostsDetails)
postRouter.get('/comment-count',getPostsWithCommentCount)
export default postRouter