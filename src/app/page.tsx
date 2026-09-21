import { navLinks } from "@/constants";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <main id="content">
      {navLinks.map((link, index) => {
        const id = link.href.slice(1);
        return (
          <Section key={id} id={id} className="min-h-[80vh]">
            <Container>
              {index === 0 ? (
                <h1 className="text-display text-text">{link.label}</h1>
              ) : (
                <h2 className="text-h2 text-text">{link.label}</h2>
              )}
            </Container>
          </Section>
        );
      })}
    </main>
  );
}
