"use client";

import { useState, useMemo } from "react";
import { Project } from "@/lib/markdownParser";
import { Github, Code2, Calendar, Filter } from "lucide-react";

export default function Projects({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    // Extract unique technologies for standard filters (simplified for UX)
    const filters = useMemo(() => {
        const uniqueTech = new Set<string>();
        projects.forEach(p => {
            if (p.technologies.toLowerCase().includes("databricks") || p.technologies.toLowerCase().includes("pyspark")) uniqueTech.add("Data Engineering");
            if (p.technologies.toLowerCase().includes("unity") || p.technologies.toLowerCase().includes("c#")) uniqueTech.add("Game Dev");
            if (p.technologies.toLowerCase().includes("react") || p.technologies.toLowerCase().includes("node") || p.technologies.toLowerCase().includes("php")) uniqueTech.add("Full-Stack");
            if (p.technologies.toLowerCase().includes("machine learning") || p.technologies.toLowerCase().includes("python")) uniqueTech.add("AI/Algorithms");
        });
        return ["All", ...Array.from(uniqueTech)];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projects;
        return projects.filter(p => {
            const t = p.technologies.toLowerCase();
            if (activeFilter === "Data Engineering") return t.includes("databricks") || t.includes("pyspark");
            if (activeFilter === "Game Dev") return t.includes("unity") || t.includes("c#");
            if (activeFilter === "Full-Stack") return t.includes("react") || t.includes("node") || t.includes("php");
            if (activeFilter === "AI/Algorithms") return t.includes("machine learning") || t.includes("python");
            return true;
        });
    }, [projects, activeFilter]);

    if (!projects || projects.length === 0) return null;

    return (
        <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90">
                    Technical Projects
                </h2>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    <Filter size={16} className="text-gray-500 mr-2" />
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Changed from grid-cols-2 to grid-cols-3 on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {filteredProjects.map((project, idx) => (
                    <div key={`${project.title}-${idx}`} className="glass-panel p-6 rounded-2xl hover-lift flex flex-col group h-full relative overflow-hidden transition-all duration-300">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md -z-10" />

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-sky-300 tracking-tight leading-snug pr-4">{project.title}</h3>
                            {project.repository && (
                                <a
                                    href={project.repository}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors p-1 shrink-0"
                                >
                                    <Github size={20} />
                                </a>
                            )}
                        </div>

                        <div className="flex items-start gap-2 mb-4 text-xs font-semibold text-gray-400 bg-black/30 border border-white/10 w-fit px-3 py-1.5 rounded-2xl">
                            <Code2 size={14} className="text-sky-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{project.technologies}</span>
                        </div>

                        {/* Flex-grow container for bullets to push the timeline to the bottom */}
                        <ul className="space-y-3 mt-2 flex-grow">
                            {project.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="text-sm text-gray-300 flex items-start leading-relaxed">
                                    <span className="text-emerald-500 mr-2 shrink-0 select-none">›</span>
                                    <span className="opacity-90">{bullet}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Timeline forced to the bottom */}
                        {project.timeline && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-6 pt-5 border-t border-white/5 font-medium">
                                <Calendar size={14} className="text-gray-400" />
                                <span>{project.timeline}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
