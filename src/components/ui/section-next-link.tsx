export function SectionNextLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-12 hidden justify-center md:flex">
      <a href={href} aria-label={label} className="inline-flex size-11 items-center justify-center rounded-full text-accent transition-colors duration-(--duration-micro) ease-calm hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16m-6-6 6 6 6-6" /></svg>
      </a>
    </div>
  );
}
