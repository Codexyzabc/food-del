import express from "express"
import {fetchUser, loginUser, registerUser, storeFeedback} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/list", fetchUser)
userRouter.post("/feedback", storeFeedback)

export default userRouter;