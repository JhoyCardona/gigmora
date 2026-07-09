import { Request, Response } from "express";
import { retrieveRelevantServices } from "../services/retrieval.service";
import { getChatbotReply, ChatMessage } from "../services/ai.service";

export async function chat(req: Request, res: Response): Promise<void> {
  try {
    const { message, history } = req.body as { message: string; history?: ChatMessage[] };

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "message is required" });
      return;
    }

    const relevantServices = await retrieveRelevantServices(message);
    const reply = await getChatbotReply(message, history || [], relevantServices);

    res.json({
      reply,
      suggestedServices: relevantServices.map((s) => ({
        id: s.id,
        title: s.title,
        price: s.price,
      })),
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Something went wrong with the chatbot" });
  }
}