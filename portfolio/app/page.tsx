import { getProfile, getExperience, getProjects, getEducation, getSocial } from "@/lib/markdownParser";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import EducationSection from "@/components/Education";
import Contact from "@/components/Contact";
import Social from "@/components/Social";
import HUD from "@/components/HUD";

export default function Home() {
  const profile = getProfile();
  const experiences = getExperience();
  const projects = getProjects();
  const edu = getEducation();
  const socialCategories = getSocial();

  return (
    <main className="flex flex-col gap-24 md:gap-32 w-full relative">
      <HUD />
      <Hero profile={profile} />
      <Skills arsenal={profile.technicalArsenal} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <EducationSection education={edu} />
      <Social categories={socialCategories} />
      <Contact />

      <footer className="mt-32 pt-16 pb-20 border-t border-white/5 text-center text-sm relative z-10 w-full max-w-4xl mx-auto">
        <div className="font-mono text-cyan-400 mb-8 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          {'>'} WAITING FOR INPUT<span className="animate-blinker inline-block text-white ml-0.5">_</span>
        </div>
        <p className="text-gray-500 font-semibold tracking-wider text-xs">© {new Date().getFullYear()} {profile.name.toUpperCase()} {" // "} LVL 05 SPECIALIST</p>
        <p className="mt-2 text-gray-600 font-mono text-[10px]">Architected dynamically from raw Markdown data</p>
      </footer>
    </main>
  );
}
