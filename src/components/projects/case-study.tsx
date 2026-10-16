import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseStudy as CaseStudyContent } from "@/content/case-studies";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { actionStyles } from "@/components/ui/action-styles";

function StudySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid min-w-0 gap-8 border-b border-border py-10 last:border-0 md:grid-cols-study-section md:gap-12 md:py-14">
      <h2 id={id} className="font-display text-4xl leading-tight font-medium text-balance">{title}</h2>
      <div className="min-w-0 text-secondary">{children}</div>
    </section>
  );
}

export function CaseStudy({ project }: { project: CaseStudyContent }) {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="pt-nav-mobile desktop:pt-nav">
        <section aria-labelledby="project-title" className="border-b border-border bg-surface py-section-small md:py-section">
          <Container className="grid items-center gap-10 desktop:grid-cols-study-hero desktop:gap-16">
            <div className="min-w-0">
              <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">{project.eyebrow}</p>
              <h1 id="project-title" className="font-display text-hero font-medium text-balance">{project.title}</h1>
              <p className="mt-6 max-w-reading text-lg text-secondary">{project.lede}</p>
              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                {project.meta.map(({ label, value }) => (
                  <div key={label} className="border-t border-border pt-4">
                    <dt className="text-xs font-medium tracking-widest text-muted uppercase">{label}</dt>
                    <dd className="mt-2 text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {project.actions.map(({ label, href }, index) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className={actionStyles(index === 0 ? "primary" : "secondary")}>
                    {label}<span className="sr-only">: {project.title} (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </div>
            <figure className="min-w-0 overflow-hidden rounded-card border border-border bg-background">
              <picture>
                <source type="image/webp" srcSet={`${project.image.src.replace(".webp", "-640.webp")} 640w, ${project.image.src.replace(".webp", "-960.webp")} 960w, ${project.image.src} 1600w`} sizes="(min-width: 1280px) 576px, (min-width: 1101px) 50vw, 100vw" />
                <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} loading="eager" fetchPriority="high" className="h-auto w-full" />
              </picture>
            </figure>
          </Container>
        </section>
        <Container className="py-8 md:py-12">
          <StudySection id="engineering-brief" title="Engineering brief">
            <p className="font-display text-3xl leading-snug text-foreground">{project.brief}</p>
            <dl aria-label="Project facts" className="mt-8 grid gap-6 border-y border-border py-6 md:grid-cols-3">
              {project.facts.map(({ label, value }) => <div key={label} className="min-w-0"><dt className="mb-2 text-xs font-medium tracking-widest text-accent uppercase">{label}</dt><dd className="text-sm text-foreground">{value}</dd></div>)}
            </dl>
          </StudySection>
          <StudySection id="system-boundary" title="System boundary">
            <p>{project.boundary}</p>
            <ol aria-label={project.flowLabel} className="mt-8 grid gap-4 sm:grid-cols-2 desktop:grid-cols-4">
              {project.flow.map(({ number, title, body }) => (
                <li key={number} className="min-w-0 border-t border-border pt-4">
                  <span className="mb-4 block text-xs font-medium text-accent">{number}</span>
                  <strong className="block text-sm text-foreground">{title}</strong>
                  <p className="mt-2 text-sm text-muted">{body}</p>
                </li>
              ))}
            </ol>
          </StudySection>
          <StudySection id="critical-decisions" title="Critical decisions">
            <div className="divide-y divide-border">
              {project.decisions.map(({ kicker, title, body, impactLabel, impact }) => (
                <article key={kicker} className="py-8 first:pt-0 last:pb-0">
                  <p className="mb-3 text-xs font-medium tracking-widest text-accent uppercase">{kicker}</p>
                  <h3 className="mb-4 font-display text-3xl leading-tight font-medium text-foreground">{title}</h3>
                  <p>{body}</p>
                  <p className="mt-4 border-l-2 border-accent pl-4"><strong className="text-foreground">{impactLabel}</strong> {impact}</p>
                </article>
              ))}
            </div>
          </StudySection>
          <StudySection id="project-practice" title={project.panelsHeading}>
            <div className="grid gap-4 md:grid-cols-3">
              {project.panels.map(({ number, title, body }) => (
                <Card as="article" tone="flat" key={number}>
                  <p className="mb-5 text-xs font-medium text-accent">{number}</p>
                  <h3 className="mb-3 font-display text-2xl leading-tight font-medium">{title}</h3>
                  <p className="text-sm text-secondary">{body}</p>
                </Card>
              ))}
            </div>
          </StudySection>
          <StudySection id="production-readiness" title={project.readinessHeading}>
            <div role="region" aria-label={`${project.title} readiness table, scroll horizontally if needed`} tabIndex={0} className="overflow-x-auto rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
              <table className="w-full min-w-table border-collapse text-left text-sm">
                <caption className="sr-only">{project.readinessLabel}</caption>
                <thead><tr>{project.readinessHeaders.map((heading) => <th key={heading} scope="col" className="border-b border-border-strong px-3 py-4 font-medium text-foreground">{heading}</th>)}</tr></thead>
                <tbody>{project.readiness.map(({ concern, evidence, boundary }) => (
                  <tr key={concern}>
                    <th scope="row" className="border-b border-border px-3 py-4 align-top font-medium text-foreground">{concern}</th>
                    <td className="border-b border-border px-3 py-4 align-top">{evidence}</td>
                    <td className="border-b border-border px-3 py-4 align-top">{boundary}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-muted">{project.note}</p>
          </StudySection>
          <StudySection id="demonstrated-skills" title="What this demonstrates">
            <ul className="list-disc space-y-3 pl-5 marker:text-accent">{project.demonstrates.map((item) => <li key={item}>{item}</li>)}</ul>
            <ul aria-label="Technical competencies" className="mt-8 flex flex-wrap gap-2">{project.tags.map((tag) => <li key={tag}><Badge>{tag}</Badge></li>)}</ul>
          </StudySection>
        </Container>
      </main>
      <nav aria-label="Project navigation" className="border-t border-border bg-surface py-6">
        <Container className="flex flex-col justify-between gap-4 sm:flex-row">
          <Link href="/#projects" className={actionStyles("quiet")}>Back to Projects</Link>
          {project.related.map(({ label, slug }) => <a key={slug} href={`/projects/${slug}/`} className={actionStyles("quiet")}>{label}</a>)}
        </Container>
      </nav>
    </>
  );
}
