import { profile } from "@/constants";

export default function Home() {
  return (
    <main id="content" className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-5 py-16">
      <h1 className="text-display text-text">{profile.name}</h1>
      <p className="text-h3 text-text">{profile.title}</p>
      <p className="text-body text-text-dim">{profile.hero.subtext}</p>
    </main>
  );
}
