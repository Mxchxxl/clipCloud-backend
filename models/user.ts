import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,

    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        required: true,
        type:String
    },
    img:{
        type:String
    },
    subscribers:{
        type:Number,
        default:0
    } ,
    subscriptions:{
        type:[String]
    }
},{timestamps:true})

export default mongoose.model("User", userSchema)