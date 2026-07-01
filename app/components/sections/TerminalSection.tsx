"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Cloud, Wind, Atom, Box,
  FileJson, Server, Fingerprint, Layers, Database,
} from "lucide-react";
import { Logo } from "../ui/Logo";

const lines = [
  { text: "> initializing valaiyagam_systems_v2.0...", delay: 500 },
  { text: "> secure_handshake: COMPLETED", delay: 1200 },
  { text: "> loading_modules: [Web, Mobile, IoT, Cloud]", delay: 1800 },
  { text: "> system_status: OPTIMIZED", delay: 2400 },
  { text: "> executing: INNOVATION_PROTOCOL", delay: 3000 },
  { text: "> welcome to the future of software engineering.", delay: 4000 },
];

export function TerminalSection() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const timers = lines.map((_, index) => {
      return setTimeout(() => {
        setVisibleLines((prev) => {
          if (prev.includes(index)) return prev;
          return [...prev, index];
        });
      }, lines[index].delay);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Atmosphere Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-slate-900/3 rounded-full" />
        <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-slate-900/5 rounded-full" />
        <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-slate-900/[0.07] rounded-full" />
      </div>

      <div className="w-full px-4 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">

        {/* Left Column: Gauge Visual with All 9 Technologies */}
        <div className="relative h-[700px] w-full flex items-center justify-center">

          {/* The Arch & Gauge SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            <svg viewBox="0 0 500 500" className="w-[600px] h-[600px] overflow-visible">
              <g className="opacity-10">
                <line x1="364.7" y1="135.3" x2="374.7" y2="135.3" stroke="#000" strokeWidth="1" />
                <line x1="370" y1="145" x2="380" y2="145" stroke="#000" strokeWidth="1" />
                <line x1="375" y1="155" x2="385" y2="155" stroke="#000" strokeWidth="1" />
                <line x1="378" y1="165" x2="388" y2="165" stroke="#000" strokeWidth="1" />
                <line x1="380" y1="175" x2="390" y2="175" stroke="#000" strokeWidth="1" />
                <line x1="382" y1="185" x2="392" y2="185" stroke="#000" strokeWidth="1" />
                <line x1="383" y1="195" x2="393" y2="195" stroke="#000" strokeWidth="1" />
                <line x1="384" y1="205" x2="394" y2="205" stroke="#000" strokeWidth="1" />
                <line x1="385" y1="215" x2="395" y2="215" stroke="#000" strokeWidth="1" />
                <line x1="385" y1="225" x2="395" y2="225" stroke="#000" strokeWidth="1" />
                <line x1="385" y1="235" x2="395" y2="235" stroke="#000" strokeWidth="1" />
                <line x1="385" y1="245" x2="395" y2="245" stroke="#000" strokeWidth="1" />
                <line x1="385" y1="255" x2="395" y2="255" stroke="#000" strokeWidth="1" />
                <line x1="384" y1="265" x2="394" y2="265" stroke="#000" strokeWidth="1" />
                <line x1="383" y1="275" x2="393" y2="275" stroke="#000" strokeWidth="1" />
                <line x1="382" y1="285" x2="392" y2="285" stroke="#000" strokeWidth="1" />
                <line x1="380" y1="295" x2="390" y2="295" stroke="#000" strokeWidth="1" />
                <line x1="378" y1="305" x2="388" y2="305" stroke="#000" strokeWidth="1" />
                <line x1="375" y1="315" x2="385" y2="315" stroke="#000" strokeWidth="1" />
                <line x1="370" y1="325" x2="380" y2="325" stroke="#000" strokeWidth="1" />
                <line x1="364.7" y1="335" x2="374.7" y2="335" stroke="#000" strokeWidth="1" />
              </g>
              <motion.path
                d="M 364.7 135.3 A 190 190 0 0 1 364.7 364.7"
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 0.8 }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </svg>
          </div>

          {/* Logo Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none scale-150">
            <Logo variant="watermark" className="opacity-100 w-64 h-64" />
          </div>

          {/* Central Text Block */}
          <div className="relative z-10 text-center max-w-[320px] pointer-events-auto">
            <h4 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">Built with the</h4>

            <div className="relative inline-block mb-4 px-3 py-1 mt-1">
              <div className="absolute inset-0 bg-[#FFDDC7] -rotate-1 rounded-sm" />
              <h3 className="relative text-5xl font-black text-[#0F172A] uppercase tracking-tighter">
                FULL Stack
              </h3>
            </div>

            <div className="text-slate-400 font-mono text-xs mb-8">/fʊl stæk/</div>

            <p className="text-slate-500 font-medium text-sm leading-relaxed px-6 opacity-80">
              A set of frameworks that combine into dynamic, maintainable, full-stack applications with scalable architecture.
            </p>
          </div>

          {/* Technologies in a Rotating Orbit */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="relative w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[
                { name: "Tailwind CSS", icon: <Wind className="w-8 h-8 text-cyan-500" />, pos: { top: '5%', left: '50%' } },
                { name: "React", icon: <Atom className="w-8 h-8 text-blue-500" />, pos: { top: '18%', right: '18%' } },
                { name: "Next.js", icon: <Box className="w-8 h-8 text-slate-900" />, pos: { top: '50%', right: '5%' } },
                { name: "Python", icon: <FileJson className="w-8 h-8 text-yellow-500" />, pos: { bottom: '18%', right: '18%' } },
                { name: "SQL", icon: <Database className="w-8 h-8 text-orange-500" />, pos: { bottom: '5%', left: '50%' } },
                { name: "MongoDB", icon: <Layers className="w-8 h-8 text-primary" />, pos: { bottom: '18%', left: '18%' } },
                { name: "AWS Cloud", icon: <Cloud className="w-8 h-8 text-amber-500" />, pos: { top: '50%', left: '5%' } },
                { name: "TypeScript", icon: <div className="font-bold text-blue-600 border-2 border-blue-600 rounded px-1 text-xs">TS</div>, pos: { top: '18%', left: '18%' } },
              ].map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  className="absolute pointer-events-auto flex flex-col items-center gap-1"
                  style={{
                    ...tech.pos,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm border border-slate-100/50 hover:scale-110 transition-transform cursor-pointer">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-[2px]">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Column: Terminal & Infrastructure */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Infrastructure</span>
            </div>
            <h2 className="text-[2.5rem] md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              OPTIMIZED FOR <br />
              THE NEXT GEN
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-lg">
              We bridge the gap between complex requirements and high-performance reality using the industry's most powerful technology stack.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="terminal-window rounded-2xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-slate-800 bg-[#020617] relative"
          >
            {/* Terminal Header */}
            <div className="terminal-header bg-slate-950 p-5 flex items-center border-b border-slate-800">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500/90 shadow-[0_0_10px_rgba(244,63,94,0.3)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/90 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-primary/90 shadow-[0_0_10px] shadow-primary/30" />
              </div>
              <span className="ml-5 text-[11px] text-slate-500 font-mono tracking-widest uppercase opacity-80">
                SYSTEM_ENGINE: ACTIVE
              </span>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body p-8 min-h-[340px] font-mono text-sm md:text-base text-primary/90 space-y-4">
              {visibleLines.map((lineIndex) => (
                <motion.div
                  key={`line-${lineIndex}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="code-line flex items-baseline gap-4"
                >
                  <span className="text-blue-500 font-bold shrink-0 opacity-60">➜</span>
                  <span
                    className={
                      lineIndex === lines.length - 1 ? "typing-animation text-white font-bold" : "opacity-90"
                    }
                  >
                    {lines[lineIndex].text}
                  </span>
                </motion.div>
              ))}
              {visibleLines.length === lines.length && (
                <motion.div
                  key="terminal-cursor"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2.5 h-5 bg-primary align-middle ml-1 shadow-[0_0_8px] shadow-primary/50"
                />
              )}
            </div>

            {/* Inner Glow */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section >
  );
}
