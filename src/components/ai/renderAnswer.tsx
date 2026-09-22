import { createElement, type ReactNode } from "react";

function isSafeHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:" || parsed.protocol === "mailto:";
  } catch {
    return false;
  }
}

function splitTrailingPunctuation(raw: string): { href: string; trailing: string } {
  const match = raw.match(/^(.*?)([),.;:!?]+)$/);
  if (!match || !match[1] || !match[2]) {
    return { href: raw, trailing: "" };
  }
  if (!isSafeHref(match[1])) {
    return { href: raw, trailing: "" };
  }
  return { href: match[1], trailing: match[2] };
}

const linkClass = "text-accent underline underline-offset-2";

function linkEl(key: number, href: string, label: string) {
  return createElement(
    "a",
    {
      key,
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: linkClass,
    },
    label,
  );
}

const TOKEN =
  /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s<]+)|(mailto:[^\s<]+)/g;

/** Parse assistant text into React nodes. Bold and safe http(s)/mailto links only. */
export function renderAnswer(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  TOKEN.lastIndex = 0;
  let match = TOKEN.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] != null) {
      nodes.push(createElement("strong", { key: key++ }, match[1]));
    } else if (match[2] != null && match[3] != null) {
      const href = match[3].trim();
      if (isSafeHref(href)) {
        nodes.push(linkEl(key++, href, match[2]));
      } else {
        nodes.push(match[0]);
      }
    } else {
      const raw = (match[4] ?? match[5] ?? "").trim();
      const { href, trailing } = splitTrailingPunctuation(raw);
      if (isSafeHref(href)) {
        nodes.push(linkEl(key++, href, href));
        if (trailing) nodes.push(trailing);
      } else {
        nodes.push(match[0]);
      }
    }

    lastIndex = TOKEN.lastIndex;
    match = TOKEN.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
