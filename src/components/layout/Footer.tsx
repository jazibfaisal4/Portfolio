import { profile } from "@/constants";
import { Container } from "@/components/ui/Container";

const footerLinks: {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
}[] = [
  { label: "GitHub", href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "email", href: `mailto:${profile.email}` },
  { label: "resume", href: profile.resume, download: true },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="text-h3 text-text">{profile.name}</p>
          <p className="text-body text-text-dim">{profile.title}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-1">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex min-h-11 items-center text-small text-text-dim hover-ok:text-accent"
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              {...(link.download ? { download: "Jazib_Faisal_Resume.pdf" } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-small text-text-dim lg:text-right">Updated {profile.updated}</p>
      </Container>
    </footer>
  );
}
