import { Router } from "express";
import {
  listServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { listServiceReviews } from "../controllers/review.controller";

const router = Router();

router.get("/", listServices); // public
router.get("/:id", getService); // public
router.post("/", requireAuth, createService); // protected
router.put("/:id", requireAuth, updateService); // protected + ownership check inside
router.delete("/:id", requireAuth, deleteService); // protected + ownership check inside

router.get("/:serviceId/reviews", listServiceReviews);

export default router;