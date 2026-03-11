"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Experience as ExperienceType } from "@/lib/markdownParser";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

type TimelineEvent = {
    id: string;
    type: 'START' | 'END';
    date: string;
    timestamp: number;
    exp: ExperienceType;
};

const parseDate = (dString: string) => {
    if (!dString || dString.toLowerCase().includes('present')) return new Date().getTime();
    const d = new Date(dString);
    return isNaN(d.getTime()) ? 0 : d.getTime();
};

const buildEvents = (exps: ExperienceType[]) => {
    const events: TimelineEvent[] = [];
    exps.forEach((exp, idx) => {
        const parts = exp.dates.split(/-|–|—/).map(s => s.trim());
        const start = parts[0];
        const end = parts.length > 1 ? parts[1] : '';

        events.push({
            id: `start-${exp.company}-${idx}`,
            type: 'START',
            date: start,
            timestamp: parseDate(start) || Date.now() - (idx * 100000),
            exp
        });

        if (end && !end.toLowerCase().includes('present')) {
            events.push({
                id: `end-${exp.company}-${idx}`,
                type: 'END',
                date: end,
                timestamp: parseDate(end) || Date.now() - (idx * 100000) + 1,
                exp
            });
        }
    });

    return events.sort((a, b) => a.timestamp - b.timestamp);
};

// Modal Component for full mission logs
const Modal = ({ exp, onClose }: { exp: ExperienceType, onClose: () => void }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    if (!exp) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
            {/* Backdrop blur overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />

            <div
                className="relative glass-panel w-full max-w-3xl bg-[#0a0f1c] border border-sky-500/30 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 shrink-0">
                    <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-cyan-300">
                            {exp.company}
                        </h3>
                        {exp.client && <h4 className="text-xs font-semibold text-emerald-300 mt-1 uppercase tracking-wider">CLIENT: {exp.client}</h4>}
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto no-scrollbar">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="font-semibold text-sky-100/90 text-lg border-r border-white/10 pr-4">{exp.role}</div>
                        <div className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-widest">
                            {exp.dates}
                        </div>
                    </div>

                    <ul className="space-y-4 pt-2">
                        {exp.bullets.map((b, i) => (
                            <li key={i} className="flex items-start text-gray-200 leading-relaxed text-[15px]">
                                <span className="text-sky-400 mr-3 shrink-0 select-none mt-1">❖</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Compact Interactive Timeline Card
const TimelineCard = ({ ev, openModal }: { ev: TimelineEvent, openModal: (exp: ExperienceType) => void }) => {
    const isStart = ev.type === 'START';
    const accentHex = isStart ? 'text-emerald-300' : 'text-rose-300';
    const accentBg = isStart ? 'bg-emerald-500/10' : 'bg-rose-500/10';
    const accentBorder = isStart ? 'border-emerald-500/30' : 'border-rose-500/30';
    const boxGlow = isStart ? 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]';

    return (
        <div
            onClick={() => openModal(ev.exp)}
            className={`cursor-pointer glass-panel p-6 rounded-2xl flex flex-col transition-all duration-300 border border-white/5 ${boxGlow} hover:-translate-y-1 bg-[#0a0f1c]/80 backdrop-blur-md h-[220px] group`}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded border ${accentBg} ${accentHex} ${accentBorder}`}>
                    {ev.date}
                </span>
                <div className="p-1.5 rounded-full text-gray-500 group-hover:text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                    <Maximize2 size={16} />
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors mb-1 truncate">
                {ev.exp.company}
            </h3>

            <div className="font-medium text-sky-200/60 group-hover:text-sky-200 text-sm mb-3 truncate leading-snug">{ev.exp.role}</div>

            <div className={`mt-auto text-[10px] font-bold px-2 py-0.5 rounded font-mono w-fit transition-colors ${isStart ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {isStart ? 'MISSION STARTED' : 'MISSION ENDED'}
            </div>

            <div className="text-[11px] text-gray-500 italic mt-3 group-hover:text-sky-400 transition-colors">
                Click to decrypt logs...
            </div>
        </div>
    );
};

// Static Complete Card for Active Missions
const ActiveCard = ({ exp }: { exp: ExperienceType }) => {
    return (
        <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col h-full transition-all duration-500 border border-sky-400/50 shadow-[0_0_30px_rgba(56,189,248,0.2)] bg-sky-900/10 cursor-default hover:border-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]">
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded border text-sky-300 border-sky-400/30 bg-sky-500/10">
                    {exp.dates}
                </span>
                <div className="px-3 py-1 rounded text-[10px] tracking-wider font-bold font-mono bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    ACTIVE
                </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-cyan-300 mb-2">
                {exp.company}
            </h3>
            {exp.client && <h4 className="text-xs font-semibold text-emerald-300 mb-2 tracking-wider uppercase">CLIENT: {exp.client}</h4>}
            <div className="font-semibold text-sky-100 text-base md:text-lg mb-6">{exp.role}</div>

            <ul className="space-y-4 pt-6 border-t border-white/10 flex-grow">
                {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start text-gray-300 leading-relaxed text-sm md:text-[15px]">
                        <span className="text-sky-400 mr-3 shrink-0 select-none mt-0.5">❖</span>
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TimelineView = ({ events, openModal }: { events: TimelineEvent[], openModal: (exp: ExperienceType) => void }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollPos = useRef<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial right-align
    useEffect(() => {
        if (scrollRef.current && !isInitialized) {
            const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
            scrollRef.current.scrollLeft = maxScroll;
            scrollPos.current = maxScroll;
            setIsInitialized(true);
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
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 z-30 w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 backdrop-blur-sm transition-all opacity-0 group-hover/timeline:opacity-100 shadow-xl">
                <ChevronLeft size={28} />
            </button>

            <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:-translate-x-0 z-30 w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 backdrop-blur-sm transition-all opacity-0 group-hover/timeline:opacity-100 shadow-xl">
                <ChevronRight size={28} />
            </button>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="overflow-x-auto no-scrollbar scroll-smooth w-full pb-6 pt-6 -mx-4 px-4 md:mx-0 md:px-0"
            >
                <div className="grid grid-rows-[1fr_1fr] auto-cols-[280px] md:auto-cols-[300px] grid-flow-col relative py-8 min-w-max gap-x-8 items-center pl-4 pr-12">
                    {/* Timeline Center Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent -translate-y-1/2 z-0 rounded-full" />

                    {events.map((ev, i) => {
                        const isTop = i % 2 === 0;

                        return (
                            <React.Fragment key={ev.id}>
                                {isTop ? (
                                    <>
                                        {/* TOP ROW CARD */}
                                        <div className="row-start-1 self-end relative z-10 pb-10 flex flex-col justify-end group/node">
                                            {/* Connector */}
                                            <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-t from-sky-400 to-transparent opacity-50 transition-opacity group-hover/node:opacity-100" />
                                            {/* Node */}
                                            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0f1c] border-[3px] border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] z-20 group-hover/node:scale-125 transition-transform" />

                                            <TimelineCard ev={ev} openModal={openModal} />
                                        </div>
                                        <div className="row-start-2 pointer-events-none"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="row-start-1 pointer-events-none"></div>
                                        {/* BOTTOM ROW CARD */}
                                        <div className="row-start-2 self-start relative z-10 pt-10 flex flex-col justify-start group/node">
                                            {/* Connector */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-b from-sky-400 to-transparent opacity-50 transition-opacity group-hover/node:opacity-100" />
                                            {/* Node */}
                                            <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0f1c] border-[3px] border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] z-20 group-hover/node:scale-125 transition-transform" />

                                            <TimelineCard ev={ev} openModal={openModal} />
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

export default function Experience({ experiences }: { experiences: ExperienceType[] }) {
    const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);

    if (!experiences || experiences.length === 0) return null;

    const currentYear = new Date().getFullYear().toString();
    const activeExperiences = useMemo(() => {
        return experiences.filter(exp => {
            const t = exp.dates || "";
            return t.toLowerCase().includes("present") || t.includes(currentYear) || t.includes((parseInt(currentYear) - 1).toString());
        });
    }, [experiences, currentYear]);

    const pastExperiences = useMemo(() => {
        return experiences.filter(exp => {
            const t = exp.dates || "";
            return !(t.toLowerCase().includes("present") || t.includes(currentYear) || t.includes((parseInt(currentYear) - 1).toString()));
        });
    }, [experiences, currentYear]);

    const pastEvents = useMemo(() => buildEvents(pastExperiences), [pastExperiences]);

    return (
        <>
            <section className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90 w-fit">
                    Professional Experience
                </h2>

                {/* Active Missions - Standard Cards */}
                {activeExperiences.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-mono tracking-widest text-sky-400 uppercase opacity-80 flex items-center gap-2">
                            <span className="w-8 h-px bg-sky-500/50"></span>
                            Active Missions
                            <span className="flex-grow h-px bg-white/5"></span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {activeExperiences.map((exp, idx) => (
                                <ActiveCard key={idx} exp={exp} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Missions - Interactive Timeline */}
                {pastEvents.length > 0 && (
                    <div className="flex flex-col gap-2 relative mt-4">
                        <h3 className="text-sm font-mono tracking-widest text-gray-500 uppercase opacity-80 flex items-center gap-2 mb-2">
                            <span className="w-8 h-px bg-gray-500/50"></span>
                            Past Missions Archive
                            <span className="flex-grow h-px bg-white/5"></span>
                        </h3>
                        <TimelineView events={pastEvents} openModal={setSelectedExp} />
                    </div>
                )}
            </section>

            {/* Full-screen Modal for Past Missions */}
            {selectedExp && (
                <Modal exp={selectedExp} onClose={() => setSelectedExp(null)} />
            )}
        </>
    );
}
