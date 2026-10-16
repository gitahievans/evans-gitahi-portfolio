import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  children: ReactNode;
  level?: 1 | 2 | 3;
};

const headings = { 1: "h1", 2: "h2", 3: "h3" } as const;

export function SectionHeading({ id, eyebrow, children, level = 2 }: SectionHeadingProps) {
  const Heading = headings[level];
  return (
    <div className="mb-10 max-w-reading">
      {eyebrow ? <p className="mb-3 text-sm font-medium tracking-widest text-accent uppercase">{eyebrow}</p> : null}
      <Heading id={id} className="font-display text-heading font-medium text-balance text-foreground">{children}</Heading>
    </div>
  );
}
