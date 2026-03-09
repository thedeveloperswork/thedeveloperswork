"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

// Helper to parse individual skill strings from markdown
function parseSkill(raw: string) {
    const match = raw.match(/(.*?)(?:\[(.*?)\])?$/);
    const name = match ? match[1].trim() : raw.trim();
    const statusStr = match && match[2] ? match[2].trim() : "";

    const statusLower = statusStr.toLowerCase();
    const isActive = statusLower.includes('active') || statusLower.includes('present');
    const isCertified = statusLower.includes('certifi');
    // It is inactive if it's not active, not certified, and has a status (like Last Used | 2024)
    const isInactive = !isActive && !isCertified && statusStr !== '';
    const inactiveDate = isInactive ? statusStr.replace(/LAST USED\s*\|?/i, '').trim() : '';

    return { name, statusStr, isActive, isCertified, isInactive, inactiveDate, raw };
}

const isDomainMatch = (item: string, filter: string) => {
    if (filter === "Data Engineering") {
        return ["Spark", "Databricks", "dbt", "Flink", "AWS", "Azure", "GCP", "Data Architecture", "Distributed Systems", "Validation", "CI/CD", "Container", "Core Languages", "Generative AI"].some(k => item.includes(k));
    }
    if (filter === "Full-Stack Web") {
        return ["Firebase", "JavaScript", "Databases", "Web Fundamentals", "Software Design", "CI/CD", "Docker", "Core Languages"].some(k => item.includes(k));
    }
    if (filter === "Game Dev") {
        return ["Game Dev", "Software Design", "C++", "C#", "Unity"].some(k => item.includes(k));
    }
    return true;
};

export default function Skills({ arsenal }: { arsenal: Record<string, string[]> }) {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const categories = Object.keys(arsenal);

    if (categories.length === 0) return null;

    const domainFilters = ["Data Engineering", "Full-Stack Web", "Game Dev"];

    return (
        <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90">
                    Technical Arsenal
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                    <Filter size={16} className="text-gray-500 mr-2" />
                    {["All", "Active", "Certified", "Last Used", ...domainFilters].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${activeFilter === filter
                                ? (domainFilters.includes(filter)
                                    ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                    : "bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]")
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {categories.map((category) => {
                    const items = arsenal[category].map(skillStr => {
                        const isDomainFiltering = domainFilters.includes(activeFilter);

                        if (skillStr.includes(':')) {
                            // Sub-card format
                            const [mainSkill, subSkillsStr] = skillStr.split(':');
                            const subs = subSkillsStr.split(',').map(s => parseSkill(s.trim()));

                            let filteredSubs = subs;

                            if (isDomainFiltering) {
                                // If filtering by domain, check the main domain category
                                if (!isDomainMatch(mainSkill.trim(), activeFilter)) {
                                    filteredSubs = [];
                                }
                            } else {
                                // Filtering by status
                                filteredSubs = subs.filter(sub => {
                                    if (activeFilter === "All") return true;
                                    if (activeFilter === "Active" && sub.isActive) return true;
                                    if (activeFilter === "Last Used" && sub.isInactive) return true;
                                    if (activeFilter === "Certified" && sub.isCertified) return true;
                                    return false;
                                });
                            }

                            return {
                                isSubCard: true,
                                name: mainSkill.trim(),
                                subs: filteredSubs,
                                parsed: { name: '', statusStr: '', isActive: false, isCertified: false, isInactive: false, inactiveDate: '', raw: '' },
                                show: true
                            };
                        } else {
                            // Top-level single pill format
                            const parsed = parseSkill(skillStr);
                            let show = false;

                            if (isDomainFiltering) {
                                show = isDomainMatch(parsed.name, activeFilter);
                            } else {
                                if (activeFilter === "All") show = true;
                                else if (activeFilter === "Active" && parsed.isActive) show = true;
                                else if (activeFilter === "Last Used" && parsed.isInactive) show = true;
                                else if (activeFilter === "Certified" && parsed.isCertified) show = true;
                            }

                            return {
                                isSubCard: false,
                                name: "",
                                subs: [],
                                show,
                                parsed
                            };
                        }
                    }).filter(item => {
                        // Don't render empty sub-cards if the filter clears all their children
                        if (item.isSubCard) return item.subs.length > 0;
                        return item.show;
                    });

                    // Don't render the category column at all if no items match the filter
                    if (items.length === 0) return null;

                    return (
                        <div key={category} className="glass-panel p-6 rounded-2xl hover-lift h-full flex flex-col w-full overflow-hidden">
                            <h3 className="text-xl font-semibold mb-6 text-sky-300">{category}</h3>
                            <div className="flex flex-wrap items-start w-full">
                                {items.map((item, id) => {
                                    if (item.isSubCard) {
                                        const hasActive = item.subs.some(s => s.isActive);
                                        const hasCertified = item.subs.some(s => s.isCertified);

                                        const wrapperClass = hasCertified
                                            ? 'bg-amber-500/5 border-amber-400/30 hover:border-amber-400/50 hover:bg-amber-500/10'
                                            : (hasActive ? 'bg-sky-500/5 border-sky-400/30 hover:border-sky-400/50 hover:bg-sky-500/10' : 'bg-black/20 border-white/5 hover:bg-white/5');

                                        const titleClass = hasCertified ? 'text-amber-300' : (hasActive ? 'text-sky-300' : 'text-gray-400');

                                        return (
                                            <div key={`sub-${id}`} className={`w-full mt-2 mb-2 p-4 rounded-xl border transition-all duration-300 ${wrapperClass}`}>
                                                <div className="flex flex-wrap items-center gap-3 mb-3 pl-1">
                                                    <span className={`text-sm font-bold tracking-wide ${titleClass}`}>{item.name}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {item.subs.map((sub, i) => {
                                                        let subClass = '';
                                                        if (sub.isCertified) {
                                                            subClass = 'bg-[#0a0f1c] border-[1.5px] border-amber-400/80 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.2)] hover:border-amber-400 hover:bg-amber-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] z-10';
                                                        } else if (sub.isActive) {
                                                            subClass = 'bg-[#0a0f1c] border-[1.5px] border-sky-400/80 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.2)] hover:border-sky-400 hover:bg-sky-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] z-10';
                                                        } else {
                                                            subClass = 'bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300 hover:bg-white/10';
                                                        }
                                                        return (
                                                            <div key={i} className={`group relative flex items-center px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-default ${subClass}`}>
                                                                <span className="tracking-wide">{sub.name}</span>
                                                                {sub.inactiveDate && <span className="ml-2 font-mono text-[10px] opacity-70 font-normal">{sub.inactiveDate}</span>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        let pillClass = '';
                                        if (item.parsed.isCertified) {
                                            pillClass = 'bg-[#0a0f1c] border-[1.5px] border-amber-400/80 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:bg-amber-500/10 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] z-10';
                                        } else if (item.parsed.isActive) {
                                            pillClass = 'bg-[#0a0f1c] border-[1.5px] border-sky-400/80 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:bg-sky-500/10 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] z-10';
                                        } else {
                                            pillClass = 'bg-white/5 border border-white/5 text-gray-500 mb-4 hover:bg-white/10 hover:text-gray-300 opacity-60 hover:opacity-100';
                                        }

                                        return (
                                            <div
                                                key={`pill-${id}`}
                                                className={`group relative flex items-center px-4 py-2 mt-2 mb-2 mr-2 rounded-full text-sm font-bold transition-all duration-300 cursor-default ${pillClass}`}
                                            >
                                                <span className="tracking-wide">{item.parsed.name}</span>
                                                {item.parsed.inactiveDate && (
                                                    <span className="ml-2 font-mono text-[11px] opacity-70 font-normal">
                                                        {item.parsed.inactiveDate}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
