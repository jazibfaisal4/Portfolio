"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { navLinks, profile } from "@/constants";
import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useActiveSection } from "@/hooks/useActiveSection";
import { handleSectionLinkClick } from "./sectionLink";
import { ScrollProgress } from "./ScrollProgress";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useActiveSection(sectionIds);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  function onNavClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setActive(id);
    handleSectionLinkClick(event);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] w-full border-b transition-[background-color,border-color,backdrop-filter] duration-160 ease-out",
          scrolled
            ? "border-line bg-bg/80 backdrop-blur-xl"
            : "border-transparent bg-bg/40 backdrop-blur-md",
        )}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <Container className="flex h-[var(--nav-h)] items-center justify-between gap-4">
          <Link
            href="/#home"
            onClick={(event) => onNavClick(event, "home")}
            className="truncate text-small font-semibold text-text"
          >
            {profile.name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={(event) => onNavClick(event, id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center px-2.5 text-small",
                    isActive ? "text-text" : "text-text-dim hover-ok:text-text",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 bottom-2 h-0.5 bg-accent"
                      transition={
                        reduceMotion ? { duration: 0 } : { duration: duration.base, ease: easing }
                      }
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic>
              <Button href={profile.resume} download="Jazib_Faisal_Resume.pdf" variant="primary">
                Resume
              </Button>
            </Magnetic>
            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded border border-line text-text md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block h-px w-4 bg-text motion-reduce:transform-none",
                    menuOpen && "translate-y-1 rotate-45",
                  )}
                />
                <span className={cn("block h-px w-4 bg-text", menuOpen && "opacity-0")} />
                <span
                  className={cn(
                    "block h-px w-4 bg-text motion-reduce:transform-none",
                    menuOpen && "-translate-y-1 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
        <ScrollProgress />
      </header>
      <div
        aria-hidden="true"
        className="w-full"
        style={{ height: "calc(var(--nav-h) + env(safe-area-inset-top, 0px))" }}
      />
      {menuOpen ? <MobileMenu onClose={closeMenu} onNavigate={setActive} /> : null}
    </>
  );
}
