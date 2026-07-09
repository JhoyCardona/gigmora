import { Router } from "express";
import { chat } from "../controllers/chat.controller";

const router = Router();

router.post("/", chat); // public, no auth needed to chat

export default router;