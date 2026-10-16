import type { ReactNode } from "react";
import { Container } from "./container";

const tones = { page: "bg-background", surface: "bg-surface", elevated: "bg-elevated" } as const;

export function Section({ id, tone = "page", children }: { id: string; tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} tabIndex={-1} className={`py-section-small md:py-section ${tones[tone]}`}>
      <Container>{children}</Container>
    </section>
  );
}
