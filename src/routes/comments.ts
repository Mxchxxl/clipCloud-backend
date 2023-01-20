import { addComment, deleteComment, getVideoComments } from "../controllers/comment";

import express from "express";
import { verifyToken } from "../middleware/verify";

const router = express.Router()

router.post('/', verifyToken, addComment)
router.delete('/:id', verifyToken, deleteComment)
router.get('/:videoId', getVideoComments)


export default router