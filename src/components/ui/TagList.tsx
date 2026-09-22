import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";

type TagListProps = {
  tags: readonly string[];
  className?: string;
};

export function TagList({ tags, className }: TagListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <Chip>{tag}</Chip>
        </li>
      ))}
    </ul>
  );
}
