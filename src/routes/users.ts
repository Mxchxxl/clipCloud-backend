import { deleteUser, disLike, getUser, like, subscribe, unSubscribe, update } from "../controllers/user";

import express from "express";
import { verifyToken } from "../middleware/verify";

const router = express.Router()


router.put('/:id', verifyToken, update)

router.delete('/:id', verifyToken, deleteUser)


router.get('/find/:id', getUser)

router.put('/sub/:id', verifyToken, subscribe)

router.put('/unsub/:id', verifyToken, unSubscribe)

router.put('/like/:vidId', verifyToken, like)

router.put('/dislike/:vidId', verifyToken, disLike)


export default router