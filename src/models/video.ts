import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,


    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        unique: true,
        required: true
    },
    imgUrl: {
        required: true,
        type: String
    },
    videoUrl: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        defalut: []
    },
    likes: {
        type: [String],
        defalut: []
    },
    dislikes: {
        type: [String],
        defalut: []
    }
}, { timestamps: true })

export default mongoose.model("Video", videoSchema)