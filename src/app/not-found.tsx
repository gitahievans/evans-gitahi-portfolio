import { Container } from "@/components/layout/container";
import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-svh items-center py-section-small">
      <Container>
        <SectionHeading level={1} eyebrow="404">Page not found</SectionHeading>
        <p className="mb-8 max-w-reading text-secondary">The page you&apos;re looking for could not be found.</p>
        <ActionLink href="/">Back to home</ActionLink>
      </Container>
    </main>
  );
}
