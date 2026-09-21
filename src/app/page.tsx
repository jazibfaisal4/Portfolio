import { navLinks } from "@/constants";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const pendingHrefs = new Set(["#home", "#about", "#skills", "#projects"]);

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      {navLinks
        .filter((link) => !pendingHrefs.has(link.href))
        .map((link) => {
          const id = link.href.slice(1);
          return (
            <Section key={id} id={id} className="min-h-[80vh]">
              <Container>
                <h2 className="text-h2 text-text">{link.label}</h2>
              </Container>
            </Section>
          );
        })}
    </main>
  );
}
