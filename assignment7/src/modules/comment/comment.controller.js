import {Router} from "express"
import {createcomments,updateCommentByID,upsertComment} from "../comment/comment.service.js"
const commentRouter = Router();
commentRouter.post('/Bulkcomment',createcomments)
commentRouter.patch('/:cId',updateCommentByID)
commentRouter.patch('/find_or_create',upsertComment)
export default commentRouter