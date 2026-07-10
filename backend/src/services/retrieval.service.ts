import prisma from "../config/prisma";

export async function retrieveRelevantServices(userMessage: string) {
  const words = userMessage
    .toLowerCase()
    .replace(/[.,!?¿¡"']/g, "") // strip punctuation before splitting
    .split(/\s+/)
    .filter((w) => w.length > 3);

  if (words.length === 0) {
    return prisma.service.findMany({
      take: 5,
      include: { category: true, provider: { select: { name: true } } },
    });
  }

  const services = await prisma.service.findMany({
    where: {
      OR: words.flatMap((word) => [
        { title: { contains: word, mode: "insensitive" as const } },
        { description: { contains: word, mode: "insensitive" as const } },
        { category: { name: { contains: word, mode: "insensitive" as const } } },
      ]),
    },
    include: { category: true, provider: { select: { name: true } } },
    take: 8,
  });

  return services;
}