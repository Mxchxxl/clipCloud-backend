import { NextFunction, Request, Response } from "express"

import CustomError from './../error';
import User from "../models/user"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({ ...req.body, password: hash })
        await newUser.save()
        res.status(200).send("user created")
    } catch (err) {
        next(err)
    }

}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await User.findOne({ name: req.body.name })
        if (!user) {
            const error: CustomError = new Error('user not found')
            error.status = 400
            throw error
        }

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) {
            const error: CustomError = new Error('password incorrect')
            error.status = 400
            throw error
        }

        if (!process.env.JWT) {
            const error: CustomError = new Error('server error')
            error.status = 500

            throw error

        }

        const token = jwt.sign({
            id: user._id,

        }, process.env.JWT)

        const userObject = user.toObject(); // or user.toJSON();
        const { password, ...safeForClient } = userObject;

        req.user = String(safeForClient._id)

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(safeForClient)


    } catch (err) {
        next(err)
    }

}