import { about } from "@/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <Reveal>
            <SectionHeader title={about.title} />
          </Reveal>
          <Reveal>
            <p className="text-body text-text-dim">{about.statement}</p>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {about.facts.map((fact) => (
            <li key={fact.title}>
              <Card className="h-full">
                <p className="text-h3 text-text">{fact.title}</p>
                <p className="mt-2 text-small text-text-dim">{fact.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
