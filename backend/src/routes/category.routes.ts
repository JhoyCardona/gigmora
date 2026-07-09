import { Router } from "express";
import { listCategories, createCategory } from "../controllers/category.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", listCategories); // public
router.post("/", requireAuth, createCategory); // any authenticated user, for now

export default router;