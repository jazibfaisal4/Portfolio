import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  title: string;
  intro?: string;
  className?: string;
};

export function SectionHeader({ title, intro, className }: SectionHeaderProps) {
  return (
    <header className={cn("flex max-w-[68ch] flex-col gap-3", className)}>
      <h2 className="text-h2 text-text">{title}</h2>
      {intro ? <p className="text-body text-text-dim">{intro}</p> : null}
    </header>
  );
}
