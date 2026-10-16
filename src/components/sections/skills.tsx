import { skills } from "@/content/skills";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionNextLink } from "@/components/ui/section-next-link";

export function Skills() {
  return (
    <Section id="experience" tone="elevated">
      <SectionHeading id="experience-heading" eyebrow={skills.eyebrow}>{skills.heading}</SectionHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 desktop:grid-cols-3">
        {skills.groups.map((group) => (
          <Card as="article" tone="flat" key={group.title} className="last:md:col-span-2 last:desktop:col-span-1">
            <p className="mb-6 text-xs font-medium tracking-widest text-accent uppercase">{group.index}</p>
            <h3 className="mb-4 font-display text-3xl font-medium leading-tight">{group.title}</h3>
            <p className="mb-6 text-sm text-secondary">{group.summary}</p>
            <dl className="divide-y divide-border border-t border-border">
              {group.rows.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-skill gap-3 py-4 last:pb-0">
                  <dt className="text-xs font-medium text-accent">{label}</dt>
                  <dd className="min-w-0 text-sm text-secondary">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>
      <SectionNextLink href="#career" label="Continue to professional experience" />
    </Section>
  );
}
