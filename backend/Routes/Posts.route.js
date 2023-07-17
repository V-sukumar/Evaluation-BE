const express=require("express")
const {PostModel}=require("../Model/Post.model")
const {auth}=require("../MiddleWare/authmiddleware")

const postRouter=express.Router()
postRouter.use(auth)

postRouter.get("/",async(req,res)=>{
    try {
        const posts=await PostModel.find({userID:req.body.userID})
        if(posts){
            res.status(200).json({posts})
        }else{
            res.status(400).json({"msg":"Post not Found"})
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
})

postRouter.post("/create",async(req,res)=>{
    try {
        console.log(req.body);
       const post=new PostModel(req.body)
       await post.save()
       res.status(200).json({"msg":"Post Added"}) 
    } catch (err) {
        res.status(400).json({error:err})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const userID=req.body.userID;
        const postId=req.params.id;
        const UserID=post.userID
        if(userID===UserID){
            await PostModel.findByIdAndUpadte({_id:postId},req.body)
            res.status(200).json({msg:`${post.title} has been updated`})
        }else{
            res.status(400).json({msg:"Not Authorized"})
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const userID=req.body.userID
        const UserID=post.userID
        const post=await PostModel.find({_id:id})
        if(userID===UserID){
            await PostModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:"Post deleted Successfully"})
        }else{
            res.status(400).json({msg:"Not Authorized"})
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
})

module.exports={
    postRouter
}