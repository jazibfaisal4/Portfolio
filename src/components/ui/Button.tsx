import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-accent text-bg hover-ok:bg-accent-2",
  secondary: "border border-line-strong bg-surface-2 text-text hover-ok:border-accent",
  ghost: "bg-transparent text-text hover-ok:text-accent",
} as const;

type Variant = keyof typeof variants;

type SharedProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps | "href"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded px-4 text-small font-medium transition-[background-color,border-color,color,transform] duration-160 ease-out active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-colors";

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(baseClass, variants[variant], className);

  if (props.href !== undefined) {
    const { href, variant: _variant, className: _className, children: _children, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { variant: _variant, className: _className, children: _children, type, ...buttonProps } = props;
  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
