import { Router } from "express";
import { sendMessage, listMessages } from "../controllers/message.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router({ mergeParams: true }); // needed to access :orderId from the parent route

router.post("/", requireAuth, sendMessage);
router.get("/", requireAuth, listMessages);

export default router;