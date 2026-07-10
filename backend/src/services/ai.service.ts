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
Never mention internal IDs, database fields, or technical details to the user.

IMPORTANT: Gigmora only has these features: browsing services, creating an account,
placing an order via the "Contratar" button on a service page, messaging within an
order, and leaving a review after completion. There is no "contact" button, no
proposal/negotiation system, and no payment processing yet. When a user wants to
proceed with a service, simply tell them to click "Contratar" on that service's page.

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