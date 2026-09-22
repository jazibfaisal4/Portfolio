import { sourceTitle } from "@/constants";
import { Chip } from "@/components/ui/Chip";

type SourceChipsProps = {
  ids: readonly string[];
};

export function SourceChips({ ids }: SourceChipsProps) {
  if (ids.length === 0) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {ids.map((id) => (
        <li key={id}>
          <Chip preserveCase>{sourceTitle(id)}</Chip>
        </li>
      ))}
    </ul>
  );
}
