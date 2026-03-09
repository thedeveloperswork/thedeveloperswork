"use client";

import { useState, useMemo } from "react";
import { Project } from "@/lib/markdownParser";
import { Github, Code2, Calendar, Filter, Pin } from "lucide-react";

export default function Projects({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

    const toggleExpand = (idx: number) => {
        setExpandedProjects(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

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
                {filteredProjects.map((project, idx) => {
                    const isPinned = expandedProjects[idx] || false;

                    return (
                        <div key={`${project.title}-${idx}`} className="glass-panel p-6 pt-10 rounded-2xl hover-lift flex flex-col group h-full relative overflow-hidden transition-all duration-500 border border-white/5 hover:border-sky-400/50">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md -z-10" />

                            {/* Mission Status Badge */}
                            <div className={`absolute top-4 left-4 text-[10px] font-bold px-2 py-0.5 rounded font-mono z-10 transition-colors ${project.timeline?.includes('Present') ? 'bg-sky-400 text-black shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]'}`}>
                                {project.timeline?.includes('Present') ? 'ACTIVE MISSION' : 'COMPLETED'}
                            </div>

                            <div className="flex justify-between items-start mb-4 mt-2">
                                <h3 className="text-xl font-bold text-sky-300 tracking-tight leading-snug pr-4">{project.title}</h3>
                                <div className="flex items-center gap-1 shrink-0 z-20">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleExpand(idx);
                                        }}
                                        className={`p-1.5 rounded-full transition-colors ${isPinned ? 'bg-sky-500/20 text-sky-400' : 'text-gray-500 hover:text-gray-300 hover:bg-white/10 opacity-0 group-hover:opacity-100'}`}
                                        title="Pin details open"
                                        aria-label="Pin details open"
                                    >
                                        <Pin size={18} className={isPinned ? 'fill-sky-400' : ''} />
                                    </button>
                                    {project.repository && (
                                        <a
                                            href={project.repository}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 shrink-0"
                                            title="View Source"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-2 mb-4 text-xs font-semibold text-gray-400 bg-black/30 border border-white/10 w-fit px-3 py-1.5 rounded-2xl">
                                <Code2 size={14} className="text-sky-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{project.technologies}</span>
                            </div>

                            <div className={`text-xs text-gray-500 italic mb-2 transition-opacity ${isPinned ? 'opacity-0 h-0 hidden m-0' : 'opacity-70 group-hover:opacity-100'}`}>
                                Hover or click Pin to expand details...
                            </div>

                            {/* Flex-grow container for bullets to push the timeline to the bottom */}
                            <div className={`overflow-hidden transition-all duration-700 ease-in-out flex-grow
                            ${isPinned ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100'}
                        `}>
                                <ul className="space-y-3 mt-2 pt-4 border-t border-white/10">
                                    {project.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} className="text-sm text-gray-300 flex items-start leading-relaxed">
                                            <span className="text-emerald-500 mr-2 shrink-0 select-none">›</span>
                                            <span className="opacity-90">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Timeline forced to the bottom */}
                            {project.timeline && (
                                <div className={`flex items-center gap-1.5 text-xs text-gray-500 mt-6 pt-5 border-t border-white/5 font-medium transition-all duration-700 ${isPinned ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                                    <Calendar size={14} className="text-gray-400" />
                                    <span>{project.timeline}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
