import express from "express";
import {
  getLeaderboard,
  addLeaderboard,
} from "../service/leaderboard.service.js";

const router = express.Router();

router.post("/", addLeaderboard);
router.get("/", getLeaderboard);

export default router;
