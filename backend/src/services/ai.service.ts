import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function getChatbotReply(
  userMessage: string,
  history: ChatMessage[],
  relevantServices: any[]
): Promise<string> {
  const servicesContext = relevantServices.length
    ? relevantServices
        .map(
          (s) =>
            `- "${s.title}" (${s.category.name}): ${s.description} — Price: $${s.price}, Delivery: ${s.deliveryDays} days, Provider: ${s.provider.name}, ID: ${s.id}`
        )
        .join("\n")
    : "No matching services found in the database.";

  const systemPrompt = `You are a helpful assistant for Gigmora, a freelance services marketplace.
Only recommend services from the list below — never invent services that aren't listed.
If nothing matches well, say so honestly and suggest the client browse categories instead.
Be concise and friendly. Mention service titles and prices when relevant.

Available services matching this conversation:
${servicesContext}`;

  const completion = await client.chat.completions.create({
    model: "openrouter/free",
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userMessage },
    ],
  });

  return completion.choices[0].message.content || "";
}