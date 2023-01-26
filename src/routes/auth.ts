import { signin, signup, verifyUser } from "../controllers/auth";

import express from "express";
import { verifyToken } from "../middleware/verify";

const router = express.Router()


router.post('/signup', signup)



router.post('/signin', signin)

router.post('/verify', verifyToken, verifyUser)


router.post('/google',)

export default router