import { profile } from "@/content/profile";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { actionStyles } from "@/components/ui/action-styles";

export function Contact() {
  const linkedIn = profile.socials.find(({ label }) => label === "LinkedIn")!;
  return (
    <Section id="contact" tone="surface">
      <SectionHeading id="contact-heading" eyebrow="Get in Touch">Contact Me</SectionHeading>
      <address className="flex flex-col gap-4 not-italic sm:flex-row sm:flex-wrap">
        <a href={`mailto:${profile.email}`} className={actionStyles("primary")}>{profile.email}</a>
        <a href={linkedIn.href} target="_blank" rel="noopener noreferrer" className={actionStyles("secondary")}>LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
      </address>
    </Section>
  );
}
