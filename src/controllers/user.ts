import { NextFunction, Request, Response } from "express"

import CustomRequest from "../types/request"
import User from "../models/user"
import video from "../models/video"

export const update = async (req: CustomRequest, res: Response, next: NextFunction) => {
    // console.log('updating user details')
    // console.log(req.params.id, req.user)

    if (req.params.id === req.user) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })

            // console.log(updatedUser)
            res.status(200).json(updatedUser)

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("cannot perform action")
    }
}

export const getUser = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const user = await User.findById(req.params.id)

        //console.log(user)
        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }

}

export const deleteUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.params.id === req.user) {
        try {
            await User.findByIdAndDelete(req.params.id).then(() => {

                res.status(200).json("user deleted")
            })



        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("cannot perform action")
    }
}


export const subscribe = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(req.user, {
            $push: { subscriptions: req.params.id }
        }, { new: true })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })

        res.status(200).json(updatedUser)


    } catch (err) {
        res.status(500).json(err)
    }
}

export const unSubscribe = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(req.user, {
            $pull: { subscriptions: req.params.id }
        }, { new: true })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })

        res.status(200).json(updatedUser)


    } catch (err) {
        res.status(500).json(err)
    }
}

export const like = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const videoId = req.params.vidId
        const likedvideo = await video.findByIdAndUpdate(videoId, {
            $addToSet: {
                likes: req.user
            },
            $pull: { dislikes: req.user }
        }, { new: true })

        return res.status(200).json(likedvideo)

    } catch (err) {
        return res.status(500).json("server error")
    }
}

export const disLike = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const videoId = req.params.vidId
        const dislikedvideo = await video.findByIdAndUpdate(videoId, {
            $addToSet: {
                dislikes: req.user
            },
            $pull: { likes: req.user }
        }, { new: true })

        return res.status(200).json(dislikedvideo)

    } catch (err) {
        return res.status(500).json("server error")
    }
}