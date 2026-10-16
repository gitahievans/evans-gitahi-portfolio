import { career } from "@/content/career";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionNextLink } from "@/components/ui/section-next-link";

export function Career() {
  return (
    <Section id="career">
      <SectionHeading id="career-heading" eyebrow={career.eyebrow}>{career.heading}</SectionHeading>
      <dl className="mb-14 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mb-20">
        {career.statistics.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse gap-3 px-6 py-8 text-center">
            <dt className="text-xs font-medium tracking-wider text-muted uppercase">{label}</dt>
            <dd className="font-display text-5xl text-accent sm:text-6xl">{value}</dd>
          </div>
        ))}
      </dl>
      <ol className="space-y-8">
        {career.roles.map((role) => (
          <li key={role.company} className="grid items-start gap-4 md:grid-cols-timeline md:gap-8">
            <p className="font-display text-2xl text-accent md:pt-8 md:text-right">{role.period}</p>
            <Card as="article" tone="flat" data-current={role.current} className="min-w-0 data-[current=true]:border-border-strong">
              <header className="mb-6 flex items-start gap-4">
                <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background font-display text-2xl text-accent">{role.initial}</span>
                <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:justify-between md:gap-6">
                  <div>
                    <h3 className="font-display text-3xl font-medium leading-tight">{role.company}</h3>
                    <p className="mt-2 text-sm text-accent">{role.role}</p>
                  </div>
                  <p className="shrink-0 text-xs font-medium text-muted">{role.date}</p>
                </div>
              </header>
              <ul className="list-disc space-y-3 pl-5 text-sm text-secondary marker:text-accent">
                {role.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
              </ul>
              <ul aria-label={`${role.company} technologies`} className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                {role.technologies.map((technology) => <li key={technology}><Badge>{technology}</Badge></li>)}
              </ul>
            </Card>
          </li>
        ))}
      </ol>
      <SectionNextLink href="#projects" label="Continue to projects" />
    </Section>
  );
}
