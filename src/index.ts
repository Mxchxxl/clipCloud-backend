import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config()

const app = express()



const connect =( )=>{
 const mongoUri = process.env.MONGO_CONNECTION;
  if (!mongoUri) {
    throw new Error("MONGO_CONNECTION is not defined in environment variables");
  }
  mongoose.connect(mongoUri).then(()=>{
    console.log('database connection established successfully')
  }).catch((err)=> console.log(err))
}



app.listen(6000, ()=>{
    connect()
    console.log('server is online on port 3000')
})