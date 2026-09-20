import { getKnowledgeResponse, systemKnowledge } from "@/lib/ai-knowledge";

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message: string };

  if (!message?.trim()) {
    return new Response("Please provide a message.", { status: 400 });
  }

  const responseText = getKnowledgeResponse(message);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < responseText.length; i++) {
        controller.enqueue(encoder.encode(responseText[i]));
        await new Promise((resolve) => setTimeout(resolve, 12));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-System-Knowledge": "embedded",
    },
  });
}

export const runtime = "nodejs";

// System knowledge embedded for reference:
void systemKnowledge;
