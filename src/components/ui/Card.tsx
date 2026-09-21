import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  default: "border-line bg-surface p-6",
  interactive:
    "border-line bg-surface p-6 transition-[border-color,transform] duration-160 ease-out hover-ok:border-accent hover-ok:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-colors",
  featured: "border-line bg-surface-2 p-8",
} as const;

type CardProps = HTMLAttributes<HTMLElement> & {
  variant?: keyof typeof variants;
};

export function Card({ variant = "default", className, ...props }: CardProps) {
  return (
    <article
      className={cn("rounded-lg border", variants[variant], className)}
      {...props}
    />
  );
}
