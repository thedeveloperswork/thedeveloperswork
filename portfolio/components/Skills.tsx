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

                                return (
                                    <div
                                        key={`${skill}-${sIdx}`}
                                        className="group relative flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-sky-500/10 hover:border-sky-500/30 font-medium"
                                    >
                                        <span>{skillName}</span>
                                        {status && (
                                            <span className="text-xs bg-black/30 px-2 py-0.5 rounded text-gray-400 group-hover:text-sky-200 transition-colors">
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
