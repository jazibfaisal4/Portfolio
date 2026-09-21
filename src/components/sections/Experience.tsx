import {
  education,
  experience,
  experienceCopy,
  experienceDateTime,
  onlyVerified,
} from "@/constants";
import { GithubRepos } from "@/components/sections/GithubRepos";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Experience() {
  const roles = onlyVerified(experience);
  const schools = onlyVerified(education);

  return (
    <Section id="experience">
      <Container>
        <Reveal>
          <SectionHeader title={experienceCopy.title} />
        </Reveal>

        <div className="mt-8 grid min-w-0 grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:gap-12">
          <Stagger className="relative flex min-w-0 flex-col gap-8 border-l border-line pl-6">
            {roles.map((item) => (
              <StaggerItem key={`${item.company}-${item.start}`} className="relative min-w-0">
                <span
                  className="absolute -left-[1.875rem] top-1.5 h-3 w-3 rounded-full border border-accent bg-accent"
                  aria-hidden="true"
                />
                <p className="text-label text-accent">
                  <time dateTime={experienceDateTime(item.start)}>{item.start}</time>
                  {" to "}
                  <time dateTime={experienceDateTime(item.end)}>{item.end}</time>
                </p>
                <h3 className="mt-2 text-h3 text-text [overflow-wrap:anywhere]">{item.role}</h3>
                <p className="mt-1 text-small text-text-dim">
                  {item.company}, {item.location}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-small text-text-dim [overflow-wrap:anywhere]">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="min-w-0">
            <Reveal>
              <h3 className="text-h3 text-text">{experienceCopy.educationTitle}</h3>
            </Reveal>
            <Stagger className="mt-6 grid min-w-0 grid-cols-1 gap-4">
              {schools.map((item) => (
                <StaggerItem key={`${item.school}-${item.year}`}>
                  <Card className="h-full">
                    <p className="text-label text-accent">{item.year}</p>
                    <h4 className="mt-2 text-h3 text-[1.125rem] text-text">{item.degree}</h4>
                    <p className="mt-1 text-small text-text-dim">{item.school}</p>
                    <p className="mt-3 text-small text-text-dim [overflow-wrap:anywhere]">{item.note}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <GithubRepos />
      </Container>
    </Section>
  );
}
