import { NextFunction, Request, Response } from "express";

import CustomError from "./types/error";
import authRoutes from "./routes/auth"
import commentRoutes from "./routes/comments"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users"
import videoRoutes from "./routes/videos"

dotenv.config()

const app = express()


app.use(cookieParser())
app.use(express.json());

const connect = () => {
  const mongoUri = process.env.MONGO_CONNECTION;
  if (!mongoUri) {
    throw new Error("MONGO_CONNECTION is not defined in environment variables");
  }
  mongoose.connect(mongoUri).then(() => {
    console.log('database connection established successfully')
  }).catch((err) => console.log(err))
}

app.use('/api/auth', authRoutes)

app.use('/api/user', userRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/comment', commentRoutes)

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'something went wrong'
  return res.status(status).json({
    success: false,
    status: status,
    message: message
  })
})

app.listen(5062, () => {
  connect()
  console.log('server is online on port 5062')
})