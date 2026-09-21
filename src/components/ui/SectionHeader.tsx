import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  index: string;
  title: string;
  intro?: string;
  className?: string;
};

export function SectionHeader({ index, title, intro, className }: SectionHeaderProps) {
  return (
    <header className={cn("flex max-w-[68ch] flex-col gap-3", className)}>
      <p className="text-label text-accent">{index}</p>
      <h2 className="text-h2 text-text">{title}</h2>
      {intro ? <p className="text-body text-text-dim">{intro}</p> : null}
    </header>
  );
}
