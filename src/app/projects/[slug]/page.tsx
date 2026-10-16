import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CaseStudy } from "@/components/projects/case-study";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getCaseStudy((await params).slug);
  if (!project) notFound();
  return {
    title: `${project.title} Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getCaseStudy((await params).slug);
  if (!project) notFound();
  return (
    <>
      <Header name={profile.name} subtitle={profile.logoSubtitle} projectPage />
      <CaseStudy project={project} />
      <Footer copyright={profile.copyright} projectPage />
    </>
  );
}
