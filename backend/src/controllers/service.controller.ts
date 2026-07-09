import { Request, Response } from "express";
import prisma from "../config/prisma";

// GET /api/services — public, with optional filters
export async function listServices(req: Request, res: Response): Promise<void> {
  try {
    const { category, minPrice, maxPrice, search } = req.query;

    const where: any = {};

    if (category && typeof category === "string") {
      where.category = { name: category };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (search && typeof search === "string") {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        category: true,
        provider: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(services);
  } catch (error) {
    console.error("List services error:", error);
    res.status(500).json({ error: "Something went wrong fetching services" });
  }
}

// GET /api/services/:id — public, single service detail
export async function getService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
        provider: { select: { id: true, name: true } },
      },
    });

    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.json(service);
  } catch (error) {
    console.error("Get service error:", error);
    res.status(500).json({ error: "Something went wrong fetching the service" });
  }
}

// POST /api/services — protected, provider only
export async function createService(req: Request, res: Response): Promise<void> {
  try {
    const providerId = req.user!.userId;
    const { title, description, categoryId, price, deliveryDays, images } = req.body;

    if (!title || !description || !categoryId || price === undefined || !deliveryDays) {
      res.status(400).json({
        error: "title, description, categoryId, price and deliveryDays are required",
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: providerId } });
    if (!user?.isProvider) {
      res.status(403).json({ error: "Only providers can create services" });
      return;
    }

    const service = await prisma.service.create({
      data: {
        providerId,
        categoryId,
        title,
        description,
        price,
        deliveryDays: Number(deliveryDays),
        images: Array.isArray(images) ? images : [],
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({ error: "Something went wrong creating the service" });
  }
}

// PUT /api/services/:id — protected, owner only
export async function updateService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const existingService = await prisma.service.findUnique({ where: { id } });
    if (!existingService) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    if (existingService.providerId !== userId) {
      res.status(403).json({ error: "You can only edit your own services" });
      return;
    }

    const { title, description, categoryId, price, deliveryDays, images } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(categoryId !== undefined && { categoryId }),
        ...(price !== undefined && { price }),
        ...(deliveryDays !== undefined && { deliveryDays: Number(deliveryDays) }),
        ...(images !== undefined && { images }),
      },
    });

    res.json(service);
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({ error: "Something went wrong updating the service" });
  }
}

// DELETE /api/services/:id — protected, owner only
export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const existingService = await prisma.service.findUnique({ where: { id } });
    if (!existingService) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    if (existingService.providerId !== userId) {
      res.status(403).json({ error: "You can only delete your own services" });
      return;
    }

    await prisma.service.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({ error: "Something went wrong deleting the service" });
  }
}