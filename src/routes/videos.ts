import { addVideo, deleteVideo, getVideo, randomVideos, subscribed, trending, updateVideo } from "../controllers/video";

import express from "express";
import { verifyToken } from "../middleware/verify";

const router = express.Router()

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.get("/find/:id", getVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/trending", trending)
router.get("/random", randomVideos)
router.get('/subscribed', verifyToken, subscribed)


export default router