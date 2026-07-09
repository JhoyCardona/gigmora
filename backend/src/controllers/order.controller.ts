import { Request, Response } from "express";
import prisma from "../config/prisma";

// POST /api/orders — cliente contrata un servicio
export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const clientId = req.user!.userId;
    const { serviceId } = req.body;

    if (!serviceId) {
      res.status(400).json({ error: "serviceId is required" });
      return;
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    if (service.providerId === clientId) {
      res.status(400).json({ error: "You cannot order your own service" });
      return;
    }

    const order = await prisma.order.create({
      data: { clientId, serviceId },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Something went wrong creating the order" });
  }
}

// GET /api/orders — lista órdenes del usuario logueado (como cliente O como proveedor)
export async function listMyOrders(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.userId;

    const orders = await prisma.order.findMany({
      where: {
        OR: [{ clientId: userId }, { service: { providerId: userId } }],
      },
      include: {
        service: { include: { provider: { select: { id: true, name: true } } } },
        client: { select: { id: true, name: true } },
        review: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    console.error("List orders error:", error);
    res.status(500).json({ error: "Something went wrong fetching orders" });
  }
}

// PATCH /api/orders/:id/status — solo el proveedor dueño del servicio puede cambiar el estado
export async function updateOrderStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user!.userId;

    const validStatuses = ["ACCEPTED", "IN_PROGRESS", "DELIVERED", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: `status must be one of: ${validStatuses.join(", ")}` });
      return;
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: { service: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    // Only the provider who owns the underlying service can change its status
    if (order.service.providerId !== userId) {
      res.status(403).json({ error: "Only the provider can update this order's status" });
      return;
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ error: "Something went wrong updating the order" });
  }
}