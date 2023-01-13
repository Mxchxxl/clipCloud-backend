import { signin, signup } from "../controllers/auth";

import express from "express";

const router = express.Router()


router.post('/signup', signup)



router.post('/signin', signin)




router.post('/google',)

export default router