import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V. Gopinadh Reddy - Senior Data Engineer & Architect",
  description: "Portfolio of Vijaya Gopinadh Reddy Velagala, a Multidisciplinary Senior Data Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased relative min-h-screen selection:bg-cyan-500/30`}>
        {/* Background Glowing Orbs */}
        <div className="bg-orb bg-sky-500/20 w-[500px] h-[500px] top-[-100px] left-[-100px]"></div>
        <div className="bg-orb bg-indigo-500/20 w-[600px] h-[600px] bottom-[-200px] right-[-100px]" style={{ animationDelay: '2s' }}></div>
        <div className="bg-orb bg-purple-500/20 w-[400px] h-[400px] top-[40%] left-[20%]" style={{ animationDelay: '4s' }}></div>

        {/* Content wrapper */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-24">
          {children}
        </div>
      </body>
    </html>
  );
}
