import { Router } from "express";
import { createOrder, listMyOrders, updateOrderStatus } from "../controllers/order.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/", requireAuth, listMyOrders);
router.patch("/:id/status", requireAuth, updateOrderStatus);

export default router;