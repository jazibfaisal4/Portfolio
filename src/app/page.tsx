import { navLinks } from "@/constants";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      {navLinks
        .filter((link) => link.href !== "#home")
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
