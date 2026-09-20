import { promptLabResponses } from "@/lib/ai-knowledge";

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as { prompt: string };

  const matchedKey = Object.keys(promptLabResponses).find(
    (key) => key.toLowerCase() === prompt.toLowerCase(),
  );

  const responseText =
    matchedKey
      ? promptLabResponses[matchedKey]
      : `// AI-generated response for: "${prompt}"
// Custom prompt processing would connect to an LLM endpoint here.
// For now, select a preset prompt or describe your architecture need.

export function generateSolution(input: string) {
  return { status: "ready", input, architecture: "MERN + Electron" };
}`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < responseText.length; i++) {
        controller.enqueue(encoder.encode(responseText[i]));
        await new Promise((resolve) => setTimeout(resolve, 8));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
  });
}

export const runtime = "nodejs";
