import { Education } from "@/lib/markdownParser";
import { GraduationCap, Award, BookOpen, Gamepad2, Database, Cloud, Code } from "lucide-react";

export default function EducationSection({ education }: { education: Education }) {
    if (!education) return null;

    return (
        <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-4 inline-block tracking-tight text-white/90">
                Education & Credentials
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl hover-lift relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <GraduationCap size={120} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-sky-300 flex items-center gap-2">
                        <GraduationCap size={20} className="text-sky-400" /> Degree
                    </h3>
                    <div className="relative z-10">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10 group-hover:border-sky-500/30 transition-colors mt-2 shadow-sm">
                            <h4 className="text-lg font-bold text-gray-100 leading-tight mb-2">{education.degree}</h4>
                            <div className="text-sm text-gray-400 font-medium mb-5">{education.institution}</div>

                            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                                {education.dates && <span className="text-xs text-sky-300 font-semibold bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded">Timeline: {education.dates}</span>}
                                {education.duration && <span className="text-xs text-purple-300 font-semibold bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded">Duration: {education.duration}</span>}

                                <span className="text-emerald-400 font-bold border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full text-xs ml-auto">
                                    CGPA: {education.cgpa}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {education.certifications.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl hover-lift relative overflow-hidden group">
                        <h3 className="text-xl font-semibold mb-4 text-purple-300 flex items-center gap-2">
                            <Award size={20} className="text-purple-400" /> Official Certifications
                        </h3>
                        <ul className="space-y-3 relative z-10">
                            {education.certifications.map((cert, idx) => {
                                // Simple mapping for common certification issuers
                                const getLogo = (text: string) => {
                                    const lower = text.toLowerCase();
                                    if (lower.includes('microsoft') || lower.includes('azure')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg';
                                    if (lower.includes('google')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg';
                                    if (lower.includes('aws') || lower.includes('amazon')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg';
                                    if (lower.includes('hackerrank')) return 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png';
                                    if (lower.includes('databricks')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg'; // Using spark as proxy
                                    if (lower.includes('mongodb')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg';
                                    return null;
                                };

                                const logoUrl = getLogo(cert);

                                // Parse potential markdown links [Credential Name](https://link-to-cred)
                                const linkMatch = cert.match(/\[(.*?)\]\((.*?)\)/);
                                let displayText = cert;
                                let linkUrl = null;

                                if (linkMatch) {
                                    displayText = cert.replace(linkMatch[0], linkMatch[1]);
                                    linkUrl = linkMatch[2];
                                }

                                return (
                                    <li key={idx} className="flex items-start text-sm text-gray-300 leading-relaxed font-medium bg-white/5 p-3.5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors shadow-sm">
                                        {logoUrl ? (
                                            <div className="w-8 h-8 rounded bg-white/10 p-1.5 mr-3 shrink-0 flex items-center justify-center">
                                                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain filter drop-shadow-md" />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded bg-purple-500/10 p-1.5 mr-3 shrink-0 flex items-center justify-center">
                                                <span className="text-purple-400 text-lg">✦</span>
                                            </div>
                                        )}
                                        <div className="flex-grow flex flex-col justify-center min-h-[32px]">
                                            {linkUrl ? (
                                                <a href={linkUrl} target="_blank" rel="noreferrer" className="text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1.5">
                                                    <span className="underline decoration-sky-500/30 underline-offset-4">{displayText.split(':')[0]}: {displayText.split(':').slice(1).join(':')}</span>
                                                </a>
                                            ) : (
                                                <span>
                                                    <strong className="text-white/90">{displayText.split(':')[0]}:</strong>
                                                    {displayText.split(':').slice(1).join(':')}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {education.training.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl hover-lift relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Gamepad2 size={120} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-emerald-300 flex items-center gap-2">
                            <BookOpen size={20} className="text-emerald-400" /> Professional Training
                        </h3>
                        <div className="space-y-4 relative z-10">
                            {education.training.map((train, idx) => {
                                const parts = train.split(' | ');
                                const title = parts[0];
                                const details = parts.slice(1);
                                const isGameDev = title.toLowerCase().includes('game');

                                return (
                                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 group-hover:border-emerald-500/30 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center gap-3 mb-3">
                                            {isGameDev && (
                                                <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                                                    <Gamepad2 size={18} />
                                                </div>
                                            )}
                                            <h4 className="text-gray-100 font-bold">{title}</h4>
                                        </div>
                                        <ul className="space-y-2 border-t border-white/10 pt-3">
                                            {details.map((detail, dIdx) => (
                                                <li key={dIdx} className="text-sm text-gray-300 leading-relaxed font-medium flex items-start gap-2">
                                                    <span className="text-emerald-400 shrink-0 mt-0.5">›</span>
                                                    <span className="opacity-90">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {education.development.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl hover-lift relative overflow-hidden group">
                        <h3 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center gap-2">
                            <Code size={20} className="text-indigo-400" /> Courses & Development
                        </h3>
                        <div className="space-y-3 relative z-10">
                            {education.development.map((course, idx) => {
                                const lowerCourse = course.toLowerCase();
                                let Icon = BookOpen;
                                let colorClass = "text-indigo-400";
                                let bgClass = "bg-indigo-500/10";

                                if (lowerCourse.includes('data engineering') || lowerCourse.includes('mongodb')) {
                                    Icon = Database;
                                    colorClass = "text-rose-400";
                                    bgClass = "bg-rose-500/10";
                                }
                                if (lowerCourse.includes('cloud') || lowerCourse.includes('aws')) {
                                    Icon = Cloud;
                                    colorClass = "text-sky-400";
                                    bgClass = "bg-sky-500/10";
                                }

                                const parts = course.split(':');
                                const vendor = parts[0];
                                const details = parts.slice(1).join(':');

                                return (
                                    <div key={idx} className="flex items-start text-sm text-gray-300 bg-white/5 p-3.5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors shadow-sm gap-3">
                                        <div className={`p-2 rounded shrink-0 ${bgClass}`}>
                                            <Icon size={16} className={colorClass} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            {details ? (
                                                <>
                                                    <strong className={`font-bold ${colorClass}`}>{vendor}</strong>
                                                    <span className="opacity-90 leading-relaxed mt-0.5">{details}</span>
                                                </>
                                            ) : (
                                                <span className="opacity-90 leading-relaxed mt-1">{course}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
