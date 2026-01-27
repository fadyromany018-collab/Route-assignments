import {Router} from "express"
import {createUser} from "../user/user.service.js"
import {updateUser} from "../user/user.service.js"
import {findEmail} from "../user/user.service.js"
import {Pk_finder} from "../user/user.service.js"
const userRouter = Router();
userRouter.post('/signup',createUser)
userRouter.patch('/:id',updateUser)
userRouter.get("/by-email", findEmail)
userRouter.get('/:id',Pk_finder)
export default userRouter