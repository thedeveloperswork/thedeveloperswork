import { getProfile, getExperience, getProjects, getEducation } from "@/lib/markdownParser";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import EducationSection from "@/components/Education";

export default function Home() {
  const profile = getProfile();
  const experiences = getExperience();
  const projects = getProjects();
  const edu = getEducation();

  return (
    <main className="flex flex-col gap-24 md:gap-32 w-full">
      <Hero profile={profile} />
      <Skills arsenal={profile.technicalArsenal} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <EducationSection education={edu} />

      <footer className="mt-20 border-t border-white/10 pt-10 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</p>
        <p className="mt-2">Architected dynamically from raw Markdown data</p>
      </footer>
    </main>
  );
}
