import { Education } from "@/lib/markdownParser";
import { GraduationCap, Award, BookOpen } from "lucide-react";

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
                        <h4 className="text-lg font-bold text-gray-100 leading-tight mb-2">{education.degree}</h4>
                        <div className="text-gray-400 font-medium">{education.institution}</div>
                        <div className="flex flex-wrap justify-between items-center mt-6 border-t border-white/10 pt-4 gap-2">
                            <span className="text-sm text-gray-400 font-semibold bg-white/5 px-2.5 py-1 rounded">{education.dates}</span>
                            <span className="text-emerald-400 font-bold border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 rounded-full text-sm">
                                CGPA: {education.cgpa}
                            </span>
                        </div>
                    </div>
                </div>

                {education.certifications.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl hover-lift relative overflow-hidden group">
                        <h3 className="text-xl font-semibold mb-4 text-purple-300 flex items-center gap-2">
                            <Award size={20} className="text-purple-400" /> Official Certifications
                        </h3>
                        <ul className="space-y-3 relative z-10">
                            {education.certifications.map((cert, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-300 leading-relaxed font-medium">
                                    <span className="text-purple-400 mr-2 shrink-0">✦</span>
                                    {cert}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {education.training.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl hover-lift">
                        <h3 className="text-xl font-semibold mb-4 text-emerald-300 flex items-center gap-2">
                            <BookOpen size={20} className="text-emerald-400" /> Professional Training
                        </h3>
                        <ul className="space-y-2">
                            {education.training.map((train, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-300 leading-relaxed font-medium">
                                    <span className="text-emerald-400 mr-2 shrink-0">›</span>
                                    <span className="opacity-90">{train}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {education.development.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl hover-lift">
                        <h3 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center gap-2">
                            <BookOpen size={20} className="text-indigo-400" /> Courses & Development
                        </h3>
                        <ul className="space-y-2">
                            {education.development.map((course, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-300 leading-relaxed font-medium">
                                    <span className="text-indigo-400 mr-2 shrink-0">›</span>
                                    <span className="opacity-90">{course}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
