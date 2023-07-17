const express=require("express")
const {userModel}=require("../Model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,gender,password}=req.body;
        const exisitnguser=await userModel.findOne({email})
        if(exisitnguser){
            res.status(400).json({"msg":"User Already exist, please use Other mail"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).json({error:err})
                }else{
                    const user=new  userModel({name,email,gender,password:hash})
                    await user.save()
                    res.status(200).json({"msg":"User Registered Successfully"})
                }
            })
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            res.status(400).json({"msg":"user Doesn't Exisit"})
        }else{
            bcrypt.compare(password,user.password,(err,decode)=>{
                if(decode){
                    const token=jwt.sign({course:"backend"},process.env.secretKey)
                    res.status(200).json({"msg":"Login Successfull"})
                }else{
                    res.status(400).json({error:err})
                }
            })
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
})

module.exports={
    userRouter
}