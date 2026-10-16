import type { HTMLAttributes } from "react";

const tones = {
  surface: "border-border bg-surface shadow-surface",
  flat: "border-border bg-surface",
  elevated: "border-border bg-elevated",
} as const;

type CardProps = HTMLAttributes<HTMLElement> & { as?: "div" | "article"; tone?: keyof typeof tones };

export function Card({ as: Element = "div", tone = "surface", className = "", ...props }: CardProps) {
  return <Element className={`rounded-card border p-6 text-foreground md:p-8 ${tones[tone]} ${className}`} {...props} />;
}
