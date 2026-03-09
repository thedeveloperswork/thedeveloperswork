export default function Skills({ arsenal }: { arsenal: Record<string, string[]> }) {
    const categories = Object.keys(arsenal);

    if (categories.length === 0) return null;

    return (
        <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90">
                Technical Arsenal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, idx) => (
                    <div key={category} className="glass-panel p-6 rounded-2xl hover-lift">
                        <h3 className="text-xl font-semibold mb-6 text-sky-300">{category}</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {arsenal[category].map((skill, sIdx) => {
                                // Parse optional status tags: e.g. "PySpark [Active | Feb 2025 - Present]"
                                const match = skill.match(/(.*?)(?:\[(.*?)\])?$/);
                                const skillName = match ? match[1].trim() : skill;
                                const status = match && match[2] ? match[2].trim() : null;

                                const isActive = status && (status.toLowerCase().includes('present') || status.toLowerCase().includes('active'));

                                return (
                                    <div
                                        key={`${skill}-${sIdx}`}
                                        className={`group relative flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-default
                                            ${isActive
                                                ? 'bg-sky-500/20 border border-sky-400/50 text-sky-200 hover:bg-sky-400 hover:text-black hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.8)] z-10'
                                                : 'bg-white/5 border border-white/10 text-gray-500 hover:bg-white/10 hover:text-gray-300 opacity-60 hover:opacity-100'}`}
                                    >
                                        <span className="tracking-wide">{skillName}</span>
                                        {status && (
                                            <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors border
                                                ${isActive
                                                    ? 'bg-black/50 text-sky-300 border-sky-400/30 group-hover:bg-black/20 group-hover:text-black group-hover:border-black/20'
                                                    : 'bg-black/30 text-gray-500 border-white/5 group-hover:text-gray-300'
                                                }`}>
                                                {status}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
