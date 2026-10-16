import { navigation } from "@/content/navigation";
import { Container } from "./container";

export function Footer({ copyright, projectPage = false }: { copyright: string; projectPage?: boolean }) {
  return (
    <footer className="border-t border-border py-10">
      <Container>
        <nav aria-label="Footer navigation">
          <ul className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigation.map(({ id, label }) => (
              <li key={id}><a href={`${projectPage ? "/" : ""}#${id}`} className="inline-flex min-h-11 items-center rounded-control text-sm text-secondary transition-colors duration-(--duration-micro) ease-calm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">{label}</a></li>
            ))}
          </ul>
        </nav>
        <p className="text-center text-sm text-muted">{copyright}</p>
      </Container>
    </footer>
  );
}
