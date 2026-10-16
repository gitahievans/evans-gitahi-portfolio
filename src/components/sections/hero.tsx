import { profile } from "@/content/profile";
import { Container } from "@/components/layout/container";
import { actionStyles } from "@/components/ui/action-styles";

export function Hero() {
  return (
    <section id="profile" aria-labelledby="profile-heading" tabIndex={-1} className="flex min-h-svh items-center pt-nav-mobile desktop:pt-nav">
      <Container className="py-section-small md:py-section">
        <div className="max-w-reading">
          <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">{profile.greeting}</p>
          <h1 id="profile-heading" className="font-display text-hero font-medium text-balance">{profile.name}</h1>
          <p className="mt-6 font-display text-3xl text-foreground sm:text-4xl">{profile.role}</p>
          <p className="mt-6 text-lg text-secondary">{profile.summary}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a href="#contact" className={actionStyles()}>Contact Info</a>
          </div>
          <ul id="socials-container" aria-label="Social profiles" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {profile.socials.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm text-secondary transition-colors duration-(--duration-micro) ease-calm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
                  {label}<span className="sr-only"> (opens in a new tab)</span><span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
