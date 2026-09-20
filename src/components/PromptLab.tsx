"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./motion";

const presetPrompts = [
  "Generate SQL schema for LMS",
  "Create Express API route for book checkout",
  "Build Scikit-Learn model pipeline",
];

export function PromptLab() {
  const [selectedPrompt, setSelectedPrompt] = useState(presetPrompts[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [copied, setCopied] = useState(false);

  async function runPrompt(prompt: string) {
    setStreaming(true);
    setOutput("");

    const res = await fetch("/api/prompt-lab", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let text = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value);
        setOutput(text);
      }
    }

    setStreaming(false);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Reveal className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="rounded-2xl bg-surface-container-low p-6 sm:p-8">
        <div className="mb-6">
          <p className="mb-2 font-headline text-xs font-bold uppercase tracking-[0.2em] text-primary-container">
            AI Prompt Lab
          </p>
          <h3 className="font-headline text-2xl font-bold text-on-surface">Interactive Micro-Playground</h3>
          <p className="mt-2 font-body text-sm text-on-surface-variant">
            Select or enter a prompt to stream AI-generated code output.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {presetPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                setSelectedPrompt(prompt);
                runPrompt(prompt);
              }}
              className={`rounded-full px-4 py-2 font-label text-xs uppercase tracking-wide transition-colors ${
                selectedPrompt === prompt
                  ? "bg-primary-container text-white"
                  : "bg-surface-container-highest text-secondary hover:text-on-surface"
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form
          className="mb-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            const prompt = customPrompt.trim() || selectedPrompt;
            runPrompt(prompt);
          }}
        >
          <input
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Or enter a custom prompt..."
            className="flex-1 rounded-xl bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-container/50"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={streaming}
            className="rounded-full bg-primary-container px-6 py-3 font-headline text-xs font-bold uppercase tracking-tightest text-white disabled:opacity-50"
          >
            {streaming ? "Streaming..." : "Run Prompt"}
          </motion.button>
        </form>

        <div className="relative">
          <pre className="max-h-80 overflow-auto rounded-xl bg-surface-container-lowest p-4 font-mono text-xs leading-relaxed text-secondary">
            {output || "// Select a prompt above to generate code output..."}
          </pre>
          {output && (
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-3 top-3 rounded-full bg-surface-container-highest px-3 py-1 font-label text-[10px] uppercase text-on-surface-variant hover:text-on-surface"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}
