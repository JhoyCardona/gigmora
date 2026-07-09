import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function listCategories(req: Request, res: Response): Promise<void> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (error) {
    console.error("List categories error:", error);
    res.status(500).json({ error: "Something went wrong fetching categories" });
  }
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      res.status(400).json({ error: "name is required" });
      return;
    }

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
      res.status(409).json({ error: "A category with this name already exists" });
      return;
    }

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ error: "Something went wrong creating the category" });
  }
}