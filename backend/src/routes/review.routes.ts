import { Router } from "express";
import { createReview } from "../controllers/review.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router({ mergeParams: true });

router.post("/", requireAuth, createReview);

export default router;