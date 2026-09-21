import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TagList } from "@/components/ui/TagList";
import { Reveal } from "@/components/motion/Reveal";
import { MotionDemo } from "./MotionDemo";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "bg", className: "bg-bg", hex: "#12181D" },
  { name: "surface", className: "bg-surface", hex: "#191C21" },
  { name: "surface-2", className: "bg-surface-2", hex: "#1F2227" },
  { name: "line", className: "bg-line", hex: "#2E343A" },
  { name: "line-strong", className: "bg-line-strong", hex: "#5F7078" },
  { name: "text", className: "bg-text", hex: "#E8E6EE" },
  { name: "text-dim", className: "bg-text-dim", hex: "#9AAEB4" },
  { name: "accent", className: "bg-accent", hex: "#1AD9C5" },
  { name: "accent-2", className: "bg-accent-2", hex: "#06DCE4" },
  { name: "live", className: "bg-live", hex: "#4EDEA3" },
  { name: "focus", className: "bg-focus", hex: "#06DCE4" },
] as const;

const contrastRows = [
  { fg: "text", values: ["14.47", "13.82", "12.90"] },
  { fg: "text-dim", values: ["7.74", "7.39", "6.90"] },
  { fg: "accent", values: ["10.03", "9.58", "8.95"] },
  { fg: "accent-2 / focus", values: ["10.53", "10.06", "9.39"] },
] as const;

export default function DesignPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main id="content">
      <Section id="tokens">
        <Container className="flex flex-col gap-16">
          <SectionHeader
            title="Design system"
            intro="Dev-only gallery of tokens and primitives. Remove src/app/design before deploy."
          />

          <div className="flex flex-col gap-6">
            <h3 className="text-h3">Color tokens</h3>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {swatches.map((swatch) => (
                <li key={swatch.name} className="flex flex-col gap-2">
                  <div className={`h-16 rounded-lg border border-line ${swatch.className}`} />
                  <p className="text-label text-text">{swatch.name}</p>
                  <p className="text-small text-text-dim">{swatch.hex}</p>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 text-small text-text-dim">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-live" aria-hidden="true" />
              live is for status dots only
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h3">Text contrast</h3>
            <p className="text-body text-text-dim">Foreground on bg / surface / surface-2. AA is 4.5:1.</p>
            <ul className="flex flex-col gap-2 text-small">
              {contrastRows.map((row) => (
                <li key={row.fg} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-line py-2">
                  <span className="min-w-[10rem] font-mono text-label text-accent">{row.fg}</span>
                  <span className="text-text">{row.values[0]}</span>
                  <span className="text-text">{row.values[1]}</span>
                  <span className="text-text">{row.values[2]}</span>
                </li>
              ))}
            </ul>
            <p className="text-small text-text-dim">
              line-strong on bg / surface / surface-2: 3.47 / 3.32 / 3.10 (borders only). Primary fill uses
              accent with a bg label (10.03:1).
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-h3">Type scale</h3>
            <p className="text-display text-text">Display heading</p>
            <p className="text-h2 text-text">Section heading</p>
            <p className="text-h3 text-text">Card heading</p>
            <p className="text-body text-text-dim">
              Body copy at 1rem, 1.0625rem from large screens, line-height 1.65, capped at 68ch.
            </p>
            <p className="text-small text-text-dim">Small supporting copy at 0.875rem.</p>
            <p className="text-label text-accent">Label mono 12px</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h3">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" href="#primitives">
                Link button
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4" id="primitives">
            <h3 className="text-h3">Chip and TagList</h3>
            <div className="flex flex-wrap gap-2">
              <Chip>LiveKit</Chip>
              <Chip>Whisper</Chip>
            </div>
            <TagList tags={["LiveKit", "PostgreSQL", "more than three words stay mixed"]} />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h3">Cards</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <p className="text-h3">Default</p>
                <p className="mt-2 text-small text-text-dim">Bordered surface card.</p>
              </Card>
              <Card variant="interactive">
                <p className="text-h3">Interactive</p>
                <p className="mt-2 text-small text-text-dim">Accent border and 2px lift on hover.</p>
              </Card>
              <Card variant="featured">
                <p className="text-h3">Featured</p>
                <p className="mt-2 text-small text-text-dim">Raised surface-2 panel.</p>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h3">MediaFrame</h3>
            <MediaFrame alt="Project screenshot placeholder" />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h3">Input border token</h3>
            <label className="flex max-w-md flex-col gap-2 text-small text-text-dim" htmlFor="design-demo-input">
              line-strong on fields
              <input
                id="design-demo-input"
                className="min-h-11 rounded border border-line-strong bg-surface px-3 text-base text-text"
                placeholder="Name"
                type="text"
              />
            </label>
          </div>
        </Container>
      </Section>

      <Section id="motion">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeader
              title="Motion"
              intro="Reveal, stagger, magnetic pull, and smooth scroll. Toggle the OS reduce-motion setting to compare."
            />
          </Reveal>
          <MotionDemo />
        </Container>
      </Section>
    </main>
  );
}
