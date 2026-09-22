import { profile } from "@/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="content" className="flex min-h-[70vh] items-center py-16">
      <Container className="flex max-w-xl flex-col gap-6">
        <p className="text-label text-accent">404</p>
        <h1 className="text-h2 text-text">{profile.notFound.title}</h1>
        <p className="text-body text-text-dim">{profile.notFound.body}</p>
        <div>
          <Button href="/" variant="primary">
            {profile.notFound.homeLabel}
          </Button>
        </div>
      </Container>
    </main>
  );
}
