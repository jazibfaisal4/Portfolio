import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MobileDock } from "@/components/MobileDock";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { Projects } from "@/components/Projects";
import { SkillsBento } from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto pb-8">
        <PageTransition>
          <Navbar />
          <main>
            <Hero />
            <SkillsBento />
            <Projects />
            <Contact />
          </main>
        </PageTransition>
      </div>
      <MobileDock />
      <Footer />
    </div>
  );
}
