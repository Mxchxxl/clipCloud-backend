import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,

    },
        videoId:{
        type: String,
        required: true,

    },
    desc:{
        required: true,
        type: String
    }
    
    
},{timestamps:true})

export default mongoose.model("Comment", commentSchema)