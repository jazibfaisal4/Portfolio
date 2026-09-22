import { assistant } from "@/constants";
import { Reveal } from "@/components/motion/Reveal";
import { AiLabConsole } from "@/components/ai/AiLabConsole";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AiLab() {
  return (
    <Section id="ai-lab">
      <Container>
        <Reveal>
          <SectionHeader title={assistant.title} intro={assistant.intro} />
        </Reveal>
        <div className="mx-auto mt-10 w-full max-w-[880px]">
          <AiLabConsole />
        </div>
      </Container>
    </Section>
  );
}
