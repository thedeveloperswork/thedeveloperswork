import { Profile } from "@/lib/markdownParser";
import { Github, Linkedin, ExternalLink, Mail, MapPin } from "lucide-react";

export default function Hero({ profile }: { profile: Profile }) {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full" />

                <div className="relative z-10">
                    {/* Floating Game Badge */}
                    <div className="absolute -top-4 right-0 md:top-4 md:right-8 bg-sky-500/10 text-sky-400 px-4 py-1.5 font-mono text-sm font-bold border border-sky-400/30 rounded backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.3)] rotate-[6deg] animate-[float_6s_ease-in-out_infinite] z-20 pointer-events-none select-none">
                        MVP NOMINEE
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-in slide-in-from-left-8 duration-1000 drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]">
                        <span className="gradient-text bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                            {profile.name}
                        </span>
                    </h1>

                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300 mb-8 font-medium animate-in fade-in duration-1000 delay-300">
                        {profile.metadata['Location'] && (
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                                <MapPin size={16} className="text-sky-400" /> {profile.metadata['Location']}
                            </span>
                        )}
                        {profile.metadata['Email'] && (
                            <a href={`mailto:${profile.metadata['Email']}`} className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/30 transition-all hover:-translate-y-0.5 shadow-sm">
                                <Mail size={16} className="text-sky-400" /> {profile.metadata['Email']}
                            </a>
                        )}
                        {profile.digitalFootprint['Portfolio'] && (
                            <a href={profile.digitalFootprint['Portfolio'].startsWith('http') ? profile.digitalFootprint['Portfolio'] : `https://${profile.digitalFootprint['Portfolio']}`} target="_blank" className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/30 transition-all hover:-translate-y-0.5 shadow-sm">
                                <ExternalLink size={16} className="text-sky-400" /> {profile.digitalFootprint['Portfolio'].replace('https://', '')}
                            </a>
                        )}
                        {profile.digitalFootprint['LinkedIn'] && (
                            <a href={profile.digitalFootprint['LinkedIn'].startsWith('http') ? profile.digitalFootprint['LinkedIn'] : `https://${profile.digitalFootprint['LinkedIn']}`} target="_blank" className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/30 transition-all hover:-translate-y-0.5 shadow-sm">
                                <Linkedin size={16} className="text-sky-400" /> LinkedIn
                            </a>
                        )}
                        {profile.digitalFootprint['GitHub'] && (
                            <a href={profile.digitalFootprint['GitHub'].startsWith('http') ? profile.digitalFootprint['GitHub'] : `https://${profile.digitalFootprint['GitHub']}`} target="_blank" className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/30 transition-all hover:-translate-y-0.5 shadow-sm">
                                <Github size={16} className="text-sky-400" /> GitHub
                            </a>
                        )}
                    </div>

                    <div className="relative p-6 md:p-8 mt-10 rounded-2xl bg-white/5 border border-white/10 shadow-inner group overflow-hidden animate-in fade-in duration-1000 delay-500">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 via-cyan-400 to-indigo-500" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 delay-100" />

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl relative z-10">
                            {profile.summary}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
