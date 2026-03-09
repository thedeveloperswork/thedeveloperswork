"use client";

import { useState } from "react";
import { Experience as ExperienceType } from "@/lib/markdownParser";
import { Pin } from "lucide-react";

export default function Experience({ experiences }: { experiences: ExperienceType[] }) {
    const [pinnedCards, setPinnedCards] = useState<Record<number, boolean>>({});

    if (!experiences || experiences.length === 0) return null;

    const togglePin = (idx: number) => {
        setPinnedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90">
                Professional Experience
            </h2>

            <div className="relative pt-6 md:pt-12 pb-12 w-full">
                {/* Horizontal Timeline Line */}
                <div className="absolute top-[60px] left-0 w-full h-0.5 bg-gradient-to-r from-sky-500/50 via-sky-500/20 to-transparent z-0 hidden md:block" />

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 pb-10 px-2 no-scrollbar">
                    {experiences.map((exp, idx) => {
                        const isCurrent = exp.dates.toLowerCase().includes('present');
                        const isPinned = pinnedCards[idx] || false;

                        return (
                            <div key={`${exp.company}-${idx}`} className="snap-start shrink-0 w-[300px] md:w-[350px] relative group flex flex-col md:pt-6">
                                {/* Timeline Node/Dot */}
                                <div className={`hidden md:block absolute top-[28px] left-6 w-3 h-3 rounded-full border-2 z-10 transition-all duration-300
                                    ${isCurrent ? 'bg-sky-400 border-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.8)] scale-125' : 'bg-[#0f172a] border-gray-500 group-hover:bg-gray-400'}
                                `} />

                                <div className="mt-8 mb-2 px-2 md:px-0 opacity-80 md:opacity-100 text-xs text-gray-400 md:hidden block font-bold">
                                    {exp.dates}
                                </div>

                                {/* Timeline Card */}
                                <div className={`glass-panel p-6 rounded-2xl hover-lift flex flex-col h-full transition-all duration-500 cursor-default relative
                                    ${isCurrent ? 'border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.3)] bg-sky-900/10' : 'border-white/5 hover:border-white/10'}
                                `}>
                                    <div className="flex justify-between items-start mb-2 hidden md:flex">
                                        <span className={`text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded border
                                            ${isCurrent ? 'text-sky-300 border-sky-400/30 bg-sky-500/10' : 'text-gray-400 border-white/10 bg-white/5'}
                                        `}>
                                            {exp.dates}
                                        </span>
                                        <button
                                            onClick={() => togglePin(idx)}
                                            className={`p-1.5 rounded-full transition-colors ${isPinned ? 'bg-sky-500/20 text-sky-400' : 'text-gray-500 hover:text-gray-300 hover:bg-white/10 opacity-0 group-hover:opacity-100'}`}
                                            title="Pin mission logs open"
                                        >
                                            <Pin size={16} className={isPinned ? 'fill-sky-400' : ''} />
                                        </button>
                                    </div>
                                    <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r mt-3 mb-1
                                        ${isCurrent ? 'from-sky-300 to-cyan-300' : 'from-gray-200 to-gray-400'}
                                    `}>
                                        {exp.company}
                                    </h3>
                                    {exp.client && <h4 className="text-xs font-semibold text-emerald-300 mb-1 uppercase tracking-wider">Client: {exp.client}</h4>}
                                    <div className="font-semibold text-sky-100 text-sm mb-4 leading-snug">{exp.role}</div>

                                    <div className={`text-xs text-gray-500 italic mb-2 transition-opacity ${isPinned ? 'opacity-0 h-0 hidden' : 'opacity-70 group-hover:opacity-100'}`}>
                                        Hover to decrypt mission logs...
                                    </div>

                                    {/* Expandable Mission Log */}
                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out
                                        ${isPinned ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100'}
                                    `}>
                                        <ul className="space-y-3 mt-4 pt-4 border-t border-white/10">
                                            {exp.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} className="flex items-start text-gray-300 leading-relaxed text-[13px]">
                                                    <span className="text-sky-400 mr-2 shrink-0 select-none">❖</span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
