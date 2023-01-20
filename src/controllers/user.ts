import { NextFunction, Request, Response } from "express"

import User from "../models/user"

export const update = async (req: Request, res: Response, next: NextFunction) => {
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

export const getUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await User.findById(req.params.id)

        //console.log(user)
        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }

}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
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


export const subscribe = async (req: Request, res: Response, next: NextFunction) => {
    try {

        await User.findByIdAndUpdate(req.user, {
            $push: { subscriptions: req.params.id }
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })

        res.status(200).json("subscription added")


    } catch (err) {
        res.status(500).json(err)
    }
}

export const unSubscribe = async (req: Request, res: Response, next: NextFunction) => {
    try {

        await User.findByIdAndUpdate(req.user, {
            $pull: { subscriptions: req.params.id }
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })

        res.status(200).json("subscription removed")


    } catch (err) {
        res.status(500).json(err)
    }
}

export const like = (req: Request, res: Response, next: NextFunction) => { }

export const disLike = (req: Request, res: Response, next: NextFunction) => { }