import { verifyToken } from "../../middlewares/auth.middlewatre.js"
import * as U from "./user.service.js"
import { Router } from "express"
const userRouter=Router()

userRouter.post("/signup",U.signup)
userRouter.post("/login",U.login)
userRouter.patch("/update",verifyToken,U.updateUser)
userRouter.delete("/delete",verifyToken,U.delete_data)
userRouter.get("/user",verifyToken,U.getUser)


export default userRouter