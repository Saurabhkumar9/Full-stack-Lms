const express=require("express")
const signupUser = require("../../Controllers/UserController/signup")
const loginUser = require("../../Controllers/UserController/login")

const userRouter=express.Router()


userRouter.post("/signup", signupUser)

userRouter.post("/login", loginUser)


module.exports=userRouter