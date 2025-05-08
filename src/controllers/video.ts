import { NextFunction, Request, Response } from "express"

import CustomRequest from "../types/request"
import User from "../models/user"
import Video from "../models/video"

export const addVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    // console.log('adding')
    const newVideo = new Video({
        userId: req.user,
        ...req.body
    })
    try {
        // console.log(newVideo)
        const saved = await newVideo.save()
        // console.log('saving')
        // console.log(saved)
        res.status(200).json(saved)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const updateVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) {
            return res.status(404).json("video not found")
        }
        if (req.user == video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })

            return res.status(200).json(updatedVideo)
        } else {
            return res.status(403).json("forbidden")
        }
    } catch (err) {
        return res.status(500).json(err)
    }



}

export const deleteVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) {
            return res.status(404).json("video not found")
        }
        if (req.user == video.userId) {
            await Video.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json("video deleted")
            })


        } else {
            res.status(403).json("forbidden")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) {
            return res.status(404).json('video not found')
        }
        res.status(200).json(video)

    } catch (err) {
        res.status(500).json(err)
    }
}


export const addView = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        }, { new: true })
        if (!video) {
            return res.status(404).json('video not found')
        }
        res.status(200).json(video)

    } catch (err) {
        res.status(500).json(err)
    }
}


export const randomVideos = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        if (!videos) {
            return res.status(200).json('no video available')
        }
        res.status(200).json(videos)

    } catch (err) {
        res.status(500).json(err)
    }
}


export const trending = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        if (!videos) {
            return res.status(200).json('no video available')
        }
        res.status(200).json(videos)

    } catch (err) {
        res.status(500).json(err)
    }
}


export const subscribed = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user)
        if (!user) {
            return res.status(200).json('user not found')
        }


        const subChannels = user.subscriptions
        // console.log(subChannels)
        const list = await Promise.all(
            subChannels.map((channelId) => {
                return Video.find({ userId: channelId })
            })
        )

        res.status(200).json(list.flat().sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime()
        }))

    } catch (err) {
        return res.status(500).json(err)
    }
}

export const getVideoByTag = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const tags = req.query.tags

        const tagsArray = typeof tags === "string"
            ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            : [];

        // console.log(tagsArray)

        const videos = await Video.find({ tags: { $in: tagsArray } }).limit(20)

        // console.log(videos)
        return res.status(200).json(videos)



    } catch (err) {
        return res.status(500).json(err)
    }

}


export const search = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const query = req.query.q
    console.log(query)
    try {

        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40)

        return res.status(200).json(videos)
    } catch (err) {
        return res.status(500).json(err)
    }
}
