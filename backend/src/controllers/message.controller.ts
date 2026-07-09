import { Request, Response } from "express";
import prisma from "../config/prisma";

async function userBelongsToOrder(orderId: string, userId: string): Promise<boolean> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { service: true },
  });
  if (!order) return false;
  return order.clientId === userId || order.service.providerId === userId;
}

// POST /api/orders/:orderId/messages
export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { orderId } = req.params;
    const senderId = req.user!.userId;
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      res.status(400).json({ error: "content is required" });
      return;
    }

    const allowed = await userBelongsToOrder(orderId, senderId);
    if (!allowed) {
      res.status(403).json({ error: "You are not part of this order" });
      return;
    }

    const message = await prisma.message.create({
      data: { orderId, senderId, content },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ error: "Something went wrong sending the message" });
  }
}

// GET /api/orders/:orderId/messages
export async function listMessages(req: Request, res: Response): Promise<void> {
  try {
    const { orderId } = req.params;
    const userId = req.user!.userId;

    const allowed = await userBelongsToOrder(orderId, userId);
    if (!allowed) {
      res.status(403).json({ error: "You are not part of this order" });
      return;
    }

    const messages = await prisma.message.findMany({
      where: { orderId },
      include: { sender: { select: { id: true, name: true } } },
      orderBy: { createdAt: "asc" },
    });

    res.json(messages);
  } catch (error) {
    console.error("List messages error:", error);
    res.status(500).json({ error: "Something went wrong fetching messages" });
  }
}