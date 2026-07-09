import { Request, Response } from "express";
import prisma from "../config/prisma";

// POST /api/orders/:orderId/review — solo el cliente, y solo si la orden está COMPLETED
export async function createReview(req: Request, res: Response): Promise<void> {
  try {
    const { orderId } = req.params;
    const authorId = req.user!.userId;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({ error: "rating must be a number between 1 and 5" });
      return;
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { review: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    if (order.clientId !== authorId) {
      res.status(403).json({ error: "Only the client who placed the order can review it" });
      return;
    }

    if (order.status !== "COMPLETED") {
      res.status(400).json({ error: "You can only review completed orders" });
      return;
    }

    if (order.review) {
      res.status(409).json({ error: "This order already has a review" });
      return;
    }

    const review = await prisma.review.create({
      data: { orderId, authorId, rating: Number(rating), comment },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ error: "Something went wrong creating the review" });
  }
}

// GET /api/services/:serviceId/reviews — público, reseñas de un servicio (vía sus órdenes)
export async function listServiceReviews(req: Request, res: Response): Promise<void> {
  try {
    const { serviceId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { order: { serviceId } },
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json(reviews);
  } catch (error) {
    console.error("List reviews error:", error);
    res.status(500).json({ error: "Something went wrong fetching reviews" });
  }
}