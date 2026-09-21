import { cn } from "@/lib/cn";

type ChipProps = {
  children: string;
  className?: string;
};

function formatChipLabel(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 3 ? label.toUpperCase() : label;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-label text-accent",
        className,
      )}
    >
      {formatChipLabel(children)}
    </span>
  );
}
