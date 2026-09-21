import { experienceCopy, pinnedRepos, type PinnedRepo } from "@/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

function toSentenceCase(label: string): string {
  const trimmed = label.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

function RepoCard({ repo }: { repo: PinnedRepo }) {
  const openLabel = `${experienceCopy.viewOnGithub}: ${repo.name} (${experienceCopy.opensInNewTab})`;

  return (
    <Card variant="interactive" className="relative flex h-full min-w-0 flex-col gap-3 p-4 md:p-6">
      <h3 className="text-h3 text-text [overflow-wrap:anywhere]">{repo.name}</h3>
      <p className="text-small text-text-dim [overflow-wrap:anywhere]">{repo.description}</p>
      {repo.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {repo.tags.map((tag) => (
            <li key={tag}>
              <Chip preserveCase>{toSentenceCase(tag)}</Chip>
            </li>
          ))}
        </ul>
      ) : null}
      <Button
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        aria-label={openLabel}
        className="mt-auto min-h-11 w-full sm:w-auto"
      >
        {experienceCopy.viewOnGithub}
      </Button>
    </Card>
  );
}

export function GithubRepos() {
  const repos = pinnedRepos.filter((repo) => repo.url.trim() !== "");
  if (repos.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 md:mt-12">
      <Reveal>
        <h3 className="text-h3 text-text">{experienceCopy.githubTitle}</h3>
      </Reveal>
      <Stagger className="mt-6 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {repos.map((repo) => (
          <StaggerItem key={repo.url} className="min-w-0">
            <RepoCard repo={repo} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
