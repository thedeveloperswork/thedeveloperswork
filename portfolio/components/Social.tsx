import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { SocialCategory } from "@/lib/markdownParser";

function extractUsername(url: string, name: string) {
    try {
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        const urlObj = new URL(fullUrl);
        
        if (name.toLowerCase() === 'website' || name.toLowerCase() === 'portfolio') {
            return urlObj.hostname.replace('www.', '');
        }
        
        const parts = urlObj.pathname.split('/').filter(Boolean);
        if (parts.length === 0) return urlObj.hostname.replace('www.', '');
        
        if (name.toLowerCase() === 'discord') {
            return parts[parts.length - 1];
        }
        if (name.toLowerCase() === 'youtube' && parts[0]?.startsWith('@')) {
             return parts[0];
        }

        let segment = parts[parts.length - 1];
        // Handle query params attached to the path segment in weird urls
        if (segment.includes('?')) {
            segment = segment.split('?')[0];
        }
        
        return segment || urlObj.hostname.replace('www.', '');
    } catch {
        return url;
    }
}

function getBrandData(name: string) {
    const lowercaseName = name.toLowerCase();
    
    let hex = "ffffff";
    let iconName = lowercaseName.replace(/\s+/g, '');

    if (lowercaseName.includes('github')) hex = "ffffff"; // Github white for dark mode
    else if (lowercaseName.includes('linkedin')) hex = "0A66C2";
    else if (lowercaseName.includes('youtube')) hex = "FF0000";
    else if (lowercaseName.includes('twitch')) hex = "9146FF";
    else if (lowercaseName.includes('twitter') || lowercaseName === 'x') {
        hex = "ffffff"; // X white for dark mode
        iconName = "x";
    }
    else if (lowercaseName.includes('instagram')) hex = "E4405F";
    else if (lowercaseName.includes('discord')) hex = "5865F2";
    else if (lowercaseName.includes('hackerrank')) hex = "00EA64";
    else if (lowercaseName.includes('leetcode')) hex = "FFA116";
    else if (lowercaseName.includes('medium')) hex = "ffffff";
    else if (lowercaseName.includes('coffee')) {
        hex = "FFDD00";
        iconName = "buymeacoffee";
    }
    else if (lowercaseName.includes('patreon')) hex = "FF424D";
    else if (lowercaseName.includes('website')) {
        hex = "0EA5E9"; // Sky-500
        iconName = "googlechrome"; // Using Chrome as a generic web icon 
    }

    return { hex, iconName };
}

export default function Social({ categories }: { categories: SocialCategory[] }) {
    if (!categories || categories.length === 0) return null;

    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 gradient-text">
                <LinkIcon className="text-sky-400" size={32} /> Connect & Explore
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-sky-500/30 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
                        
                        <h3 className="text-lg font-semibold text-white mb-4 tracking-wide border-b border-white/5 pb-2">
                            {category.category.toUpperCase()}
                        </h3>
                        
                        <div className="flex flex-col gap-3 relative z-10">
                            {category.links.map((link, linkIdx) => {
                                const username = extractUsername(link.url, link.name);
                                const { hex, iconName } = getBrandData(link.name);
                                const iconUrl = iconName === 'linkedin' 
                                    ? 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg'
                                    : `https://cdn.simpleicons.org/${iconName}/${hex}`;

                                return (
                                    <a 
                                        key={linkIdx} 
                                        href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/20 group/link"
                                    >
                                        <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={iconUrl} alt={link.name} className="w-full h-full object-contain drop-shadow-md" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{link.name}</span>
                                            <span className="font-semibold text-gray-200 group-hover/link:text-white transition-colors text-sm break-all">
                                                {username}
                                            </span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-sky-400" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
