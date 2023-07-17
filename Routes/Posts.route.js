const express = require("express");
const { auth } = require("../MiddleWare/authmiddleware");
const { postModel } = require("../Model/Post.model");


const postRouter = express.Router();
postRouter.use(auth);


postRouter.get("/", async(req,res) => {
    try{
        const {device, device1, device2} = req.query
        if(device){
            const posts = await postModel.find({userID: req.body.userID, device});
            if(posts.length===0){
                res.json({msg: "Posts not found"});
            }else{
                res.status(200).json({posts});
            }
        }else if(device1 && device2){
            const posts = await postModel.find({userID: req.body.userID, device1, device2});
            if(posts.length===0){
                res.json({msg: "Posts not found"});
            }else{
                res.status(200).json({posts});
            }
        }
        else{
            const posts = await postModel.find({userID: req.body.userID});
            if(posts.length===0){
                res.json({msg: "Posts not found"});
            }else{
                res.status(200).json({posts});
            }
        }
    }catch(err){
        res.status(400).json({error:err})
    }
})


postRouter.post("/create", async(req,res) => {
   try{
    console.log(req.body);
    const post = new postModel(req.body);
    await post.save();
    res.json({msg: "Post create successfully"});     
   }catch(err){
    res.json(err);
   }
})


postRouter.patch("/update/:id", async (req,res) => {
    try{
       const postID = req.params.id;
        await postModel.findByIdAndUpdate({_id:postID}, req.body);
        res.status(200).json({"msg": "title has been updated"})
    }catch(err){
        res.status(400).send(err);
    }
})


postRouter.delete("/delete/:id", async(req,res) => {
    try{
        const postID = req.params.id;
         await postModel.findByIdAndDelete({_id:postID}, req.body);
         res.status(200).json({"msg": "title has been deleted"})
     }catch(err){
         res.status(400).send(err);
     }
})



module.exports = {
    postRouter
}