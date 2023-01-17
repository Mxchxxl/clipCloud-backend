import { NextFunction, Request, Response } from "express"

import User from "../models/user"

export const update = async (req: Request, res: Response, next: NextFunction) => {
    console.log('updating user details')
    console.log(req.params.id, req.user)

    if (req.params.id === req.user) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })

            console.log(updatedUser)
            res.status(200).json(updatedUser)

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("cannot perform action")
    }
}

export const getUser = (req: Request, res: Response, next: NextFunction) => { }

export const deleteUser = (req: Request, res: Response, next: NextFunction) => { }


export const subscribe = (req: Request, res: Response, next: NextFunction) => { }

export const unSubscribe = (req: Request, res: Response, next: NextFunction) => { }

export const like = (req: Request, res: Response, next: NextFunction) => { }

export const disLike = (req: Request, res: Response, next: NextFunction) => { }