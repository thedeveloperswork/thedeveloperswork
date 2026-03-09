import { Profile } from "@/lib/markdownParser";
import { Github, Linkedin, ExternalLink, Mail, MapPin } from "lucide-react";

export default function Hero({ profile }: { profile: Profile }) {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full" />

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-in slide-in-from-left-8 duration-1000">
                        <span className="gradient-text bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                            {profile.name}
                        </span>
                    </h1>

                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300 mb-8 font-medium animate-in fade-in duration-1000 delay-300">
                        {profile.metadata['Location'] && (
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                <MapPin size={16} className="text-sky-400" /> {profile.metadata['Location']}
                            </span>
                        )}
                        {profile.metadata['Email'] && (
                            <a href={`mailto:${profile.metadata['Email']}`} className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                                <Mail size={16} className="text-sky-400" /> {profile.metadata['Email']}
                            </a>
                        )}
                        {profile.digitalFootprint['Portfolio'] && (
                            <a href={profile.digitalFootprint['Portfolio'].startsWith('http') ? profile.digitalFootprint['Portfolio'] : `https://${profile.digitalFootprint['Portfolio']}`} target="_blank" className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                                <ExternalLink size={16} className="text-sky-400" /> {profile.digitalFootprint['Portfolio'].replace('https://', '')}
                            </a>
                        )}
                        {profile.digitalFootprint['LinkedIn'] && (
                            <a href={profile.digitalFootprint['LinkedIn'].startsWith('http') ? profile.digitalFootprint['LinkedIn'] : `https://${profile.digitalFootprint['LinkedIn']}`} target="_blank" className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                                <Linkedin size={16} className="text-sky-400" /> LinkedIn
                            </a>
                        )}
                        {profile.digitalFootprint['GitHub'] && (
                            <a href={profile.digitalFootprint['GitHub'].startsWith('http') ? profile.digitalFootprint['GitHub'] : `https://${profile.digitalFootprint['GitHub']}`} target="_blank" className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                                <Github size={16} className="text-sky-400" /> GitHub
                            </a>
                        )}
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl border-l-2 border-sky-400 pl-6 py-2">
                        {profile.summary}
                    </p>
                </div>
            </div>
        </section>
    );
}
