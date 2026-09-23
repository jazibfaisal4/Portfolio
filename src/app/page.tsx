import dynamic from "next/dynamic";
import { AssistantWidgets } from "@/components/ai/AssistantWidgets";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

const AiLab = dynamic(() => import("@/components/sections/AiLab"), {
  loading: () => (
    <section
      id="ai-lab"
      aria-label="AI Lab"
      className="scroll-mt-[var(--section-offset)] min-h-[70dvh] py-16 md:py-24 lg:py-32"
    />
  ),
});

export default function Home() {
  return (
    <>
      <main id="content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AiLab />
        <Experience />
        <Contact />
      </main>
      <AssistantWidgets />
    </>
  );
}
