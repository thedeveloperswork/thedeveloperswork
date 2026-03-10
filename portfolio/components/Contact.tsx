"use client";

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";

type CommMedium = 'Email' | 'WhatsApp' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'Facebook' | 'Telegram';

const COMM_MEDIUMS: { id: CommMedium; label: string; placeholder: string; validate: (val: string) => string | null }[] = [
    { id: 'Email', label: 'Email', placeholder: 'name@domain.com', validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Invalid email format' },
    { id: 'WhatsApp', label: 'WhatsApp', placeholder: '+1234567890', validate: (v) => /^\+?[1-9]\d{1,14}$/.test(v) ? null : 'Invalid phone number format' },
    { id: 'Twitter', label: 'X (Twitter)', placeholder: '@username', validate: (v) => /^@?(\w){1,15}$/.test(v) ? null : 'Invalid Twitter handle' },
    { id: 'Instagram', label: 'Instagram', placeholder: '@username', validate: (v) => /^@?[a-zA-Z0-9._]{1,30}$/.test(v) ? null : 'Invalid Instagram handle' },
    { id: 'LinkedIn', label: 'LinkedIn', placeholder: 'linkedin.com/in/username', validate: (v) => /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/.test(v) ? null : 'Invalid LinkedIn URL' },
    { id: 'Facebook', label: 'Facebook', placeholder: 'facebook.com/username', validate: (v) => /^(https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i.test(v) ? null : 'Invalid Facebook URL' },
    { id: 'Telegram', label: 'Telegram', placeholder: '@username', validate: (v) => /^@?[a-zA-Z0-9_]{5,32}$/.test(v) ? null : 'Invalid Telegram handle' },
];

export default function Contact() {
    const [medium, setMedium] = useState<CommMedium>('Email');
    const [commValue, setCommValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const activeMedium = COMM_MEDIUMS.find(m => m.id === medium)!;

    const handleCommChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCommValue(val);
        if (val) {
            setError(activeMedium.validate(val));
        } else {
            setError(null);
        }
    };

    const handleMediumSelect = (m: CommMedium) => {
        setMedium(m);
        setIsOpen(false);
        setCommValue('');
        setError(null);
    };

    return (
        <section className="relative z-10 w-full max-w-4xl mx-auto pt-8 pb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-12 tracking-tight flex items-center gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
                    {'// '}Initiate Transmission
                </span>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-sky-500/50 to-transparent"></div>
            </h2>

            <div className="glass-panel p-6 md:p-10 rounded-2xl border border-white/10 relative overflow-visible group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

                <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase">Identifier</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-sans"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <label className="text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase z-20">Medium</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white flex justify-between items-center focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-sans"
                                >
                                    {activeMedium.label}
                                    <ChevronDown size={16} className={`transition-transform text-sky-400 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
                                        <div className="absolute top-full left-0 w-full mt-2 bg-[#0f172a] border border-white/10 rounded-xl overflow-hidden z-30 shadow-2xl flex flex-col max-h-60 overflow-y-auto">
                                            {COMM_MEDIUMS.map((m) => (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => handleMediumSelect(m.id)}
                                                    className={`w-full text-left px-4 py-3 hover:bg-sky-500/20 transition-colors ${medium === m.id ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300'}`}
                                                >
                                                    {m.label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="commLink" className="text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase">Comm Link</label>
                            <div className="relative">
                                <input
                                    type={medium === 'Email' ? 'email' : 'text'}
                                    id="commLink"
                                    value={commValue}
                                    onChange={handleCommChange}
                                    placeholder={activeMedium.placeholder}
                                    className={`w-full bg-black/40 border ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-sky-500/50 focus:ring-sky-500/50'} rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all font-sans`}
                                />
                                {error && (
                                    <span className="absolute -bottom-5 left-1 text-[10px] uppercase tracking-wider text-red-400 font-mono animate-in fade-in slide-in-from-top-1">
                                        {error}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <label htmlFor="message" className="text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase">Payload</label>
                        <textarea
                            id="message"
                            rows={5}
                            placeholder="Construct your message..."
                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-sans resize-y min-h-[120px]"
                        ></textarea>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            type="button"
                            className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-white border border-sky-400/30 font-mono font-bold text-sm tracking-widest rounded-xl transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                TRANSMIT <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
