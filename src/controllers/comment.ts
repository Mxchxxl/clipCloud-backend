import { NextFunction, Request, Response } from "express"

import Comment from "../models/comments"
import Video from "../models/video"

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newComment = new Comment({ ...req.body, userId: req.user })
        const saved = await newComment.save()
        console.log(saved)
        return res.status(200).json(saved)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId = req.params.id

        const retrivedComment = await Comment.findById(commentId)
        if (!retrivedComment) {
            return res.status(404).json('comment not found')
        }
        const video = await Video.findById(retrivedComment.videoId)
        if (!video) {
            return res.status(404).json('error deleting comment')
        }
        if (retrivedComment.userId == req.user || req.user == video.userId) {
            await Comment.findByIdAndDelete(commentId)
            return res.status(200).json("comment deleted")
        } else {
            return res.status(403).json('permission denied')
        }

    } catch (err) {
        return res.status(500).json(err)
    }
}

export const getVideoComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const videoId = req.params.videoId
        console.log(videoId)
        const comments = await Comment.find({ videoId: videoId })

        return res.status(200).json(comments)

    } catch (err) {
        return res.status(500).json(err)
    }
}