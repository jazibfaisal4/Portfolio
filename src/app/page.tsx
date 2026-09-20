import { profile } from "@/constants";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-5 py-16">
      <h1 className="font-headline text-4xl font-bold text-on-surface">{profile.name}</h1>
      <p className="text-lg text-on-surface">{profile.title}</p>
      <p className="max-w-[68ch] text-on-surface-variant">{profile.hero.subtext}</p>
    </main>
  );
}
