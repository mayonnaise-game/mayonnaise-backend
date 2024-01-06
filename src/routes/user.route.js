import express from "express";
import { getCurrentUsers } from "../service/user.service";

const router = express.Router();

router.get("/current", getCurrentUsers);
router.get("/me");

export default router;