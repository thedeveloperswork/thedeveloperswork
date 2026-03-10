"use client";

import { useState, useEffect } from "react";
import { Profile } from "@/lib/markdownParser";
import { Github, Linkedin, ExternalLink, Mail, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero({ profile }: { profile: Profile }) {
    // Use floating text from profile, fallback to old logic if empty
    const cloudSkills = profile.technicalArsenal["Cloud Ecosystem"] || [];
    const certSkills = cloudSkills
        .filter(s => s.toLowerCase().includes('certifi') && !s.includes('GCP:'))
        .map(s => {
            const match = s.match(/(.*?)(?:\[(.*?)\])?$/);
            return match ? match[1].trim() : s;
        });

    const floatingBadges = profile.floatingText && profile.floatingText.length > 0
        ? profile.floatingText
        : ["Senior Data Engineer", ...certSkills];

    // Parse slides and handle slider state by splitting on headings (###)
    const slidesRaw = profile.summary.split('### ').filter(Boolean);
    const slides = slidesRaw.map(s => {
        const lines = s.split('\n').map(l => l.trim()).filter(Boolean);
        let heading = lines[0].replace(/\*\*/g, '').trim();
        if (heading.endsWith(':')) heading = heading.slice(0, -1);

        const bodyLines = lines.slice(1).map(l => l.startsWith('* ') ? l.substring(2) : l);
        return { heading, bodyLines };
    });

    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrollDelay, setScrollDelay] = useState(10000);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, scrollDelay);
        return () => clearTimeout(timer);
    }, [currentSlide, scrollDelay, slides.length]);

    const handleManualNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setScrollDelay(30000);
    };

    const handleManualPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setScrollDelay(30000);
    };

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        setScrollDelay(30000);
    };

    // Extract current slide data
    const currentSlideData = slides[currentSlide] || { heading: '', bodyLines: [] };

    return (
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="glass-panel p-5 md:p-12 rounded-3xl relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full" />

                <div className="relative z-10 flex flex-col pt-4 md:pt-0">
                    {/* Floating Badges */}
                    <div className="absolute top-0 right-0 md:top-2 md:right-4 flex flex-col gap-3 items-end z-20 pointer-events-none select-none">
                        {floatingBadges.map((text, idx) => {
                            const isEven = idx % 2 === 0;
                            const isThird = idx % 3 === 0;
                            
                            let colorClasses = "bg-sky-500/10 text-sky-400 border-sky-400/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]";
                            if (isThird) {
                                colorClasses = "bg-amber-500/10 text-amber-400 border-amber-400/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]";
                            } else if (!isEven) {
                                colorClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.2)]";
                            }

                            const rotateClass = isEven ? "-rotate-[3deg]" : "rotate-[4deg]";
                            const animationClass = isEven ? "animate-[float_7s_ease-in-out_infinite]" : "animate-[float_6s_ease-in-out_infinite]";

                            return (
                                <div key={idx} className={`${colorClasses} px-4 py-1.5 font-mono text-xs md:text-sm font-bold border rounded-full backdrop-blur-md ${rotateClass} ${animationClass}`}>
                                    {text}
                                </div>
                            );
                        })}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-in slide-in-from-left-8 duration-1000">
                        <span className="gradient-text bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
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

                    <div className="relative p-3 md:p-8 mt-6 md:mt-10 rounded-2xl bg-transparent group overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 via-cyan-400 to-indigo-500 transition-all duration-300" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 delay-100" />

                        <div className="flex items-center justify-between gap-2 md:gap-4 relative z-10 w-full">
                            <button
                                onClick={handleManualPrev}
                                className="p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-gray-500 border border-white/10 transition-all shrink-0 hover-lift z-20"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <div className="flex-1 min-h-[140px] flex flex-col justify-center text-left px-2 md:px-12">
                                <div
                                    key={currentSlide}
                                    className="animate-slide-focus w-full max-w-4xl flex flex-col gap-3 md:gap-4"
                                >
                                    {currentSlideData.heading && (
                                        <h3 className="text-xl md:text-2xl font-bold tracking-wide drop-shadow-[0_0_4px_rgba(56,189,248,0.6)] gradient-text bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                                            {currentSlideData.heading}
                                        </h3>
                                    )}
                                    <div className="text-sm md:text-base leading-relaxed opacity-90 flex flex-col gap-2.5">
                                        {currentSlideData.bodyLines.map((line: string, idx: number) => (
                                            <p key={idx} className="flex items-start gap-3">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 opacity-80" />
                                                <span className="gradient-text bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">{line}</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleManualNext}
                                className="p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-gray-500 border border-white/10 transition-all shrink-0 hover-lift z-20"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        {/* Slide indicators */}
                        <div className="flex justify-center gap-2 mt-6 relative z-10">
                            {slides.map((_: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleDotClick(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-sky-400 w-6 shadow-[0_0_8px_rgba(56,189,248,0.8)]' : 'bg-gray-600 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
