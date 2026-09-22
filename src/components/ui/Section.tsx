import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id: string;
};

export function Section({ id, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-[var(--section-offset)] py-16 md:py-24 lg:py-32", className)}
      {...props}
    />
  );
}
