const express=require("express")
const signupUser = require("../../Controllers/UserController/signup")
const{ loginUser, updatePassword} = require("../../Controllers/UserController/login")

const userRouter=express.Router()


userRouter.post("/signup", signupUser)

userRouter.post("/login", loginUser)

userRouter.post('/update/password', updatePassword)

module.exports=userRouter