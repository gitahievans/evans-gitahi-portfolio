import { profile } from "@/content/profile";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Career } from "@/components/sections/career";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Header name={profile.name} subtitle={profile.logoSubtitle} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Career />
        <Projects />
        <Contact />
      </main>
      <Footer copyright={profile.copyright} />
    </>
  );
}
