import { AssistantWidgets } from "@/components/ai/AssistantWidgets";
import { About } from "@/components/sections/About";
import { AiLab } from "@/components/sections/AiLab";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

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
