type DockItem = {
  href: string;
  label: string;
  active?: boolean;
  download?: string;
  target?: string;
  rel?: string;
};

const items: DockItem[] = [
  { href: "#", label: "Home", active: true },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  {
    href: "/Jazib_Faisal_Resume.pdf",
    label: "Resume",
    download: "Jazib_Faisal_Resume.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export function MobileDock() {
  return (
    <nav className="fixed bottom-6 left-1/2 z-[100] flex w-fit -translate-x-1/2 items-center gap-4 rounded-full bg-surface-container-high/50 px-6 py-3 shadow-glass backdrop-blur-dock md:hidden">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          download={item.download}
          target={item.target}
          rel={item.rel}
          className={`rounded-full px-3 py-1.5 font-label text-xs uppercase tracking-[0.12em] transition-all ${
            item.active
              ? "bg-primary-container text-white shadow-electric-glow"
              : "text-on-surface-variant hover:text-primary-container"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
