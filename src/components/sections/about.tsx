import { profile } from "@/content/profile";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionNextLink } from "@/components/ui/section-next-link";

export function About() {
  return (
    <Section id="about" tone="surface">
      <SectionHeading id="about-heading" eyebrow={profile.about.eyebrow}>{profile.about.heading}</SectionHeading>
      <div className="grid items-start gap-12 md:grid-cols-about desktop:gap-20">
        <div>
          <p className="font-display text-3xl leading-snug text-secondary sm:text-4xl">{profile.about.paragraphs[0]}</p>
          <p className="mt-7 border-l-2 border-accent pl-5 text-secondary">{profile.about.paragraphs[1]}</p>
        </div>
        <dl className="divide-y divide-border border-y border-border" aria-label="Background and credentials">
          {profile.about.evidence.map(({ label, items }) => (
            <div key={label} className="py-5">
              <dt className="mb-3 text-xs font-medium tracking-widest text-accent uppercase">{label}</dt>
              <dd className="space-y-4">
                {items.map((item) => (
                  <div key={item.title}>
                    <p className="font-display text-2xl font-semibold leading-snug">{item.title}</p>
                    {"detail" in item ? <p className="mt-1 text-sm text-muted">{item.detail}</p> : null}
                  </div>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <SectionNextLink href="#experience" label="Continue to engineering skills" />
    </Section>
  );
}
