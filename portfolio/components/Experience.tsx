import { Experience as ExperienceType } from "@/lib/markdownParser";

export default function Experience({ experiences }: { experiences: ExperienceType[] }) {
    if (!experiences || experiences.length === 0) return null;

    return (
        <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90">
                Professional Experience
            </h2>

            <div className="relative border-l border-sky-500/30 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
                {experiences.map((exp, idx) => (
                    <div key={`${exp.company}-${idx}`} className="relative glass-panel hover-lift rounded-2xl p-6 md:p-8">
                        <div className="absolute -left-[41px] md:-left-[49px] top-8 w-4 h-4 bg-sky-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(56,189,248,0.8)]" />

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-indigo-300">
                                    {exp.company}
                                </h3>
                                {exp.client && <h4 className="text-lg text-emerald-300 mt-1">Client: {exp.client}</h4>}
                                <div className="font-semibold text-gray-200 mt-2 text-lg">{exp.role}</div>
                            </div>
                            <div className="text-left md:text-right flex flex-col items-start md:items-end gap-1.5">
                                <span className="inline-flex bg-white/10 text-sky-200 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap border border-white/10 shadow-inner">
                                    {exp.dates}
                                </span>
                                <span className="text-sm text-gray-400 font-medium">{exp.location}</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mt-6">
                            {exp.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start text-gray-300 leading-relaxed text-[15px]">
                                    <span className="text-sky-400 mr-3 shrink-0 select-none">❖</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
