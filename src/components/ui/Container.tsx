import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-8 lg:px-10", className)} {...props} />
  );
}
