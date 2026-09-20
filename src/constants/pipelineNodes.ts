export type PipelineNode = {
  id: number;
  name: string;
  summary: string;
  tags: readonly string[];
  status?: string;
  verified: boolean;
};

export const pipelineNodes: readonly PipelineNode[] = [
  {
    id: 1,
    name: "Candidate voice",
    summary: "Browser microphone audio streams to the agent in real time over LiveKit.",
    tags: ["LiveKit"],
    verified: true,
  },
  {
    id: 2,
    name: "Speech to text",
    summary: "Whisper (small model) runs locally on CPU.",
    tags: ["Whisper", "Hugging Face Transformers", "Python"],
    verified: true,
  },
  {
    id: 3,
    name: "Interview logic",
    summary:
      "A LiveKit Agents worker runs the live conversation (greeting, barge-in, silence detection, ending on voice). Questions and scoring come from services my teammates built.",
    tags: ["LiveKit Agents", "Python"],
    verified: true,
  },
  {
    id: 4,
    name: "Text to speech",
    summary: "ElevenLabs is the main voice, with a local Meta MMS-TTS fallback.",
    tags: ["ElevenLabs", "Meta MMS-TTS"],
    verified: true,
  },
  {
    id: 5,
    name: "Storage",
    summary: "Completed interviews are saved to PostgreSQL and linked to real candidate applications.",
    tags: ["PostgreSQL", "Alembic"],
    verified: true,
  },
  {
    id: 6,
    name: "Recruiter dashboard",
    summary: "Recruiters review candidates and results.",
    tags: [],
    status: "In progress",
    verified: true,
  },
];
