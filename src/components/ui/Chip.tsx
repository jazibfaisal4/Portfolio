import { cn } from "@/lib/cn";

type ChipProps = {
  children: string;
  className?: string;
  preserveCase?: boolean;
};

function formatChipLabel(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 3 ? label.toUpperCase() : label;
}

export function Chip({ children, className, preserveCase = false }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 max-w-full flex-wrap items-center overflow-hidden rounded-full border border-line bg-surface px-3 py-1 text-label text-accent",
        className,
      )}
    >
      <span className="min-w-0 max-w-full overflow-hidden text-ellipsis break-words [overflow-wrap:anywhere]">
        {preserveCase ? children : formatChipLabel(children)}
      </span>
    </span>
  );
}
