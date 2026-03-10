"use client";

import { useEffect, useState } from "react";

export default function HUD() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-6 right-6 z-50 text-right pr-4 border-r-2 border-sky-400 hidden sm:block animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="font-mono text-sky-400 tracking-widest text-xs font-bold mb-1.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
                LVL 05 :: SENIOR
            </div>
            <div className="font-mono text-cyan-300 tracking-widest text-xs font-bold mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                CLASS :: DATA ENGR
            </div>

            <div className="w-32 h-[5px] bg-white/10 ml-auto relative overflow-hidden rounded-full">
                <div className="absolute top-0 left-0 h-full w-[85%] bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.8)] animate-pulse" />
            </div>

            <div className="text-[10px] text-gray-400 mt-1 font-mono font-semibold">
                HP: 85%
            </div>
        </div>
    );
}
