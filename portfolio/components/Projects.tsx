"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Project } from "@/lib/markdownParser";
import { Github, Code2, Calendar, Filter, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

type ProjectTimelineEvent = {
    id: string;
    type: 'START' | 'END';
    date: string;
    timestamp: number;
    project: Project;
};

const parseDate = (dString: string) => {
    if (!dString || dString.toLowerCase().includes('present')) return new Date().getTime();
    const d = new Date(dString);
    return isNaN(d.getTime()) ? 0 : d.getTime();
};

const buildProjectEvents = (projects: Project[]) => {
    const events: ProjectTimelineEvent[] = [];
    projects.forEach((proj, idx) => {
        if (!proj.timeline) return;

        const parts = proj.timeline.split(/-|–|—/).map(s => s.trim());
        const start = parts[0];
        const end = parts.length > 1 ? parts[1] : '';

        events.push({
            id: `start-${proj.title}-${idx}`,
            type: 'START',
            date: start,
            timestamp: parseDate(start) || Date.now() - (idx * 100000),
            project: proj
        });

        if (end && !end.toLowerCase().includes('present')) {
            events.push({
                id: `end-${proj.title}-${idx}`,
                type: 'END',
                date: end,
                timestamp: parseDate(end) || Date.now() - (idx * 100000) + 1,
                project: proj
            });
        }
    });

    return events.sort((a, b) => a.timestamp - b.timestamp);
};

// Modal Component for full project logs
const ProjectModal = ({ proj, onClose }: { proj: Project, onClose: () => void }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    if (!proj) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />

            <div
                className="relative glass-panel w-full max-w-3xl bg-[#0a0f1c] border border-emerald-500/30 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start p-6 border-b border-white/10 bg-white/5 shrink-0">
                    <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 mb-2 mr-6">
                            {proj.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-black/30 border border-white/10 w-fit px-3 py-1.5 rounded-2xl">
                            <Code2 size={14} className="text-emerald-400 shrink-0" />
                            <span>{proj.technologies}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {proj.repository && (
                            <a
                                href={proj.repository}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 shrink-0"
                                title="View Source"
                            >
                                <Github size={24} />
                            </a>
                        )}
                        <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-rose-500/20 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto no-scrollbar">
                    {proj.timeline && (
                        <div className="flex items-center gap-2 mb-6">
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-widest flex items-center gap-2">
                                <Calendar size={14} />
                                {proj.timeline}
                            </div>
                        </div>
                    )}

                    <ul className="space-y-4 pt-2">
                        {proj.bullets.map((b, i) => (
                            <li key={i} className="flex items-start text-gray-200 leading-relaxed text-[15px]">
                                <span className="text-emerald-400 mr-3 shrink-0 select-none mt-1">›</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Compact Interactive Timeline Card for Projects
const ProjectTimelineCard = ({ ev, openModal }: { ev: ProjectTimelineEvent, openModal: (proj: Project) => void }) => {
    const isStart = ev.type === 'START';
    const accentHex = isStart ? 'text-amber-300' : 'text-purple-300';
    const accentBg = isStart ? 'bg-amber-500/10' : 'bg-purple-500/10';
    const accentBorder = isStart ? 'border-amber-500/30' : 'border-purple-500/30';
    const boxGlow = isStart ? 'hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]';

    return (
        <div
            onClick={() => openModal(ev.project)}
            className={`cursor-pointer glass-panel p-6 rounded-2xl flex flex-col transition-all duration-300 border border-white/5 ${boxGlow} hover:-translate-y-1 bg-[#0a0f1c]/80 backdrop-blur-md h-[220px] group`}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded border ${accentBg} ${accentHex} ${accentBorder}`}>
                    {ev.date}
                </span>
                <div className="p-1.5 rounded-full text-gray-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <Maximize2 size={16} />
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors mb-1 truncate">
                {ev.project.title}
            </h3>

            <div className="font-medium text-emerald-200/60 group-hover:text-emerald-200 text-sm mb-3 truncate leading-snug">{ev.project.technologies}</div>

            <div className={`mt-auto text-[10px] font-bold px-2 py-0.5 rounded font-mono w-fit transition-colors ${isStart ? 'bg-amber-500/20 text-amber-300' : 'bg-purple-500/20 text-purple-300'}`}>
                {isStart ? 'PROJECT STARTED' : 'PROJECT DELIVERED'}
            </div>

            <div className="text-[11px] text-gray-500 italic mt-3 group-hover:text-emerald-400 transition-colors">
                Click to decrypt logs...
            </div>
        </div>
    );
};

// Static Complete Card for Active Projects
const ActiveProjectCard = ({ proj }: { proj: Project }) => {
    return (
        <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col h-full transition-all duration-500 border border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-900/10 cursor-default hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] relative overflow-hidden group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md -z-10" />

            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded border text-emerald-300 border-emerald-400/30 bg-emerald-500/10">
                        {proj.timeline}
                    </span>
                    <div className="px-3 py-1 rounded text-[10px] tracking-wider font-bold font-mono bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        ACTIVE MISSION
                    </div>
                </div>
                {proj.repository && (
                    <a
                        href={proj.repository}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 shrink-0 z-20"
                        title="View Source"
                    >
                        <Github size={20} />
                    </a>
                )}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 mb-3 pr-4">
                {proj.title}
            </h3>

            <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-gray-400 bg-black/30 border border-white/10 w-fit px-3 py-1.5 rounded-2xl">
                <Code2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{proj.technologies}</span>
            </div>

            <ul className="space-y-4 pt-6 border-t border-white/10 flex-grow">
                {proj.bullets.map((b, i) => (
                    <li key={i} className="flex items-start text-gray-300 leading-relaxed text-sm md:text-[15px]">
                        <span className="text-emerald-400 mr-3 shrink-0 select-none mt-0.5">›</span>
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ProjectTimelineView = ({ events, openModal }: { events: ProjectTimelineEvent[], openModal: (proj: Project) => void }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollPos = useRef<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (scrollRef.current && !isInitialized) {
            const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
            scrollRef.current.scrollLeft = maxScroll;
            scrollPos.current = maxScroll;
            const timeout = setTimeout(() => setIsInitialized(true), 0);
            return () => clearTimeout(timeout);
        }
    }, [events, isInitialized]);

    // Auto-scroll loop
    useEffect(() => {
        let animationFrameId: number;

        const scroll = () => {
            if (scrollRef.current && !isHovered && isInitialized) {
                // Auto-scroll speed (pixels per frame). Adjust decimal for smoother/slower.
                scrollPos.current -= 0.5;

                if (scrollPos.current < 0) {
                    // Loop back to start (right side) if it reaches the end
                    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                    scrollPos.current = maxScroll;
                }
                scrollRef.current.scrollLeft = scrollPos.current;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, isInitialized]);

    const handleScroll = () => {
        if (scrollRef.current && isHovered) {
            scrollPos.current = scrollRef.current.scrollLeft;
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    };

    if (events.length === 0) return null;

    return (
        <div
            className="relative w-full group/timeline"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 z-30 w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 backdrop-blur-sm transition-all opacity-0 group-hover/timeline:opacity-100 shadow-xl">
                <ChevronLeft size={28} />
            </button>

            <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:-translate-x-0 z-30 w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 backdrop-blur-sm transition-all opacity-0 group-hover/timeline:opacity-100 shadow-xl">
                <ChevronRight size={28} />
            </button>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="overflow-x-auto no-scrollbar scroll-smooth w-full pb-6 pt-6 -mx-4 px-4 md:mx-0 md:px-0"
            >
                <div className="grid grid-rows-[1fr_1fr] auto-cols-[280px] md:auto-cols-[300px] grid-flow-col relative py-8 min-w-max gap-x-8 items-center pl-4 pr-12">
                    {/* Timeline Center Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent -translate-y-1/2 z-0 rounded-full" />

                    {events.map((ev, i) => {
                        const isTop = i % 2 === 0;

                        return (
                            <React.Fragment key={ev.id}>
                                {isTop ? (
                                    <>
                                        {/* TOP ROW CARD */}
                                        <div className="row-start-1 self-end relative z-10 pb-10 flex flex-col justify-end group/node">
                                            {/* Connector */}
                                            <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-t from-emerald-400 to-transparent opacity-50 transition-opacity group-hover/node:opacity-100" />
                                            {/* Node */}
                                            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0f1c] border-[3px] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20 group-hover/node:scale-125 transition-transform" />

                                            <ProjectTimelineCard ev={ev} openModal={openModal} />
                                        </div>
                                        <div className="row-start-2 pointer-events-none"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="row-start-1 pointer-events-none"></div>
                                        {/* BOTTOM ROW CARD */}
                                        <div className="row-start-2 self-start relative z-10 pt-10 flex flex-col justify-start group/node">
                                            {/* Connector */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-b from-emerald-400 to-transparent opacity-50 transition-opacity group-hover/node:opacity-100" />
                                            {/* Node */}
                                            <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0f1c] border-[3px] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20 group-hover/node:scale-125 transition-transform" />

                                            <ProjectTimelineCard ev={ev} openModal={openModal} />
                                        </div>
                                    </>
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default function Projects({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

    const currentYear = new Date().getFullYear().toString();
    const activeMissions = useMemo(() => {
        return filteredProjects.filter(p => {
            const t = p.timeline || "";
            return t.toLowerCase().includes("present") || t.includes(currentYear) || t.includes((parseInt(currentYear) - 1).toString());
        });
    }, [filteredProjects, currentYear]);

    const pastMissions = useMemo(() => {
        return filteredProjects.filter(p => {
            const t = p.timeline || "";
            return !(t.toLowerCase().includes("present") || t.includes(currentYear) || t.includes((parseInt(currentYear) - 1).toString()));
        });
    }, [filteredProjects, currentYear]);

    const pastEvents = useMemo(() => buildProjectEvents(pastMissions), [pastMissions]);

    if (!projects || projects.length === 0) return null;

    return (
        <>
            <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90">
                        Technical Projects
                    </h2>

                    <div className="flex flex-wrap items-center gap-2">
                        <Filter size={16} className="text-gray-500 mr-2" />
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                    ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-10 mt-2">
                    {activeMissions.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <h3 className="text-sm font-mono tracking-widest text-emerald-400 uppercase opacity-80 flex items-center gap-2">
                                <span className="w-8 h-px bg-emerald-500/50"></span>
                                Active Missions
                                <span className="flex-grow h-px bg-white/5"></span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-fr">
                                {activeMissions.map((p, idx) => (
                                    <ActiveProjectCard key={idx} proj={p} />
                                ))}
                            </div>
                        </div>
                    )}

                    {pastEvents.length > 0 && (
                        <div className="flex flex-col gap-2 relative mt-4">
                            <h3 className="text-sm font-mono tracking-widest text-gray-500 uppercase opacity-80 flex items-center gap-2 mb-2">
                                <span className="w-8 h-px bg-gray-500/50"></span>
                                Past Missions Archive
                                <span className="flex-grow h-px bg-white/5"></span>
                            </h3>
                            <ProjectTimelineView events={pastEvents} openModal={setSelectedProject} />
                        </div>
                    )}
                </div>
            </section>

            {/* Full-screen Modal for Past Projects */}
            {selectedProject && (
                <ProjectModal proj={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </>
    );
}
