import { NextFunction, Request, Response } from "express"

import CustomError from "../error"
import jwt from "jsonwebtoken"

// import { User } from "../types/custom"


const error: CustomError = new Error('')

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // console.log('verifying token')
    const token = req.cookies.access_token
    // console.log(token)
    if (!token) {

        error.status = 401
        error.message = "error performing action"
        return res.json(error).status(401)
    }

    if (!process.env.JWT) {
        error.status = 500
        error.message = 'server error'
        return res.json(error).status(500)
    }

    jwt.verify(token, process.env.JWT as string, (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
        if (err) {
            error.status = 403
            error.message = 'invalid token'
            return res.json(error).status(403)
        }
        if (typeof decoded === 'object') {
            req.user = String(decoded.id)
            next()
        }
        else if (typeof decoded === 'string') {
            req.user = decoded
            next()
        }
        else {
            return res.json(error).status(500)
        }


    })

}