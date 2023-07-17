const mongoose=require("mongoose")

const PostSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userId:String,
    user:String
},{
    versionKey:false
})

const PostModel=mongoose.model("posts",PostSchema)

module.exports={
    PostModel
}