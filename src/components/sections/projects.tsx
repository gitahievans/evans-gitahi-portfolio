import { projects } from "@/content/projects";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { actionStyles } from "@/components/ui/action-styles";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionNextLink } from "@/components/ui/section-next-link";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading id="projects-heading" eyebrow={projects.eyebrow}>{projects.heading}</SectionHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 desktop:grid-cols-3">
        {projects.items.map((project) => (
          <Card as="article" tone="flat" key={project.slug} className="flex min-w-0 flex-col last:md:col-span-2 last:desktop:col-span-1">
            <ul aria-label={`${project.title} technologies`} className="mb-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => <li key={technology}><Badge>{technology}</Badge></li>)}
            </ul>
            <h3 className="mb-4 font-display text-3xl font-medium">
              <a href={project.href} className="rounded-control transition-colors duration-(--duration-micro) ease-calm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">{project.title}</a>
            </h3>
            <p className="mb-6 text-sm text-secondary">{project.summary}</p>
            <ul className="mb-8 space-y-2 text-sm text-secondary">
              {project.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={project.href} className={actionStyles("secondary")}>Case Study<span className="sr-only">: {project.title}</span></a>
              <a href={project.repository} target="_blank" rel="noopener noreferrer" className={actionStyles("quiet")}>Github<span className="sr-only">: {project.title} (opens in a new tab)</span></a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className={actionStyles("quiet")}>Live Demo<span className="sr-only">: {project.title} (opens in a new tab)</span></a>
            </div>
          </Card>
        ))}
      </div>
      <SectionNextLink href="#contact" label="Continue to contact information" />
    </Section>
  );
}
