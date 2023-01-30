import { addVideo, addView, deleteVideo, getVideo, getVideoByTag, randomVideos, search, subscribed, trending, updateVideo } from "../controllers/video";

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
router.get("/tag", getVideoByTag)
router.get('/search', search)
router.get("/addview/:id", addView)

export default router