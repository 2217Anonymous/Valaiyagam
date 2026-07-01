"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackingSectionProps {
  children: React.ReactNode;
  index: number;
  total: number;
  title?: string;
  backgroundImage?: string;
  bgColor?: string;
  bgColorClass?: string;
  titleColor?: string;
  textColor?: string;
  id?: string;
}

function TitleParallax({ title, titleColor }: { title: string; titleColor?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-1000, 1000]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.1, 0.1, 0]);

  return (
    <div ref={ref} className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
      <motion.h2
        style={{ x, opacity, color: titleColor || "rgba(0,0,0,0.5)" }}
        className="text-[10rem] md:text-[15rem] font-black uppercase tracking-tighter whitespace-nowrap opacity-10"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function StackingSection({
  children,
  index,
  total,
  title,
  backgroundImage,
  bgColor = "#ffffff",
  bgColorClass,
  titleColor,
  textColor = "#0f172a",
  id,
}: StackingSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${bgColorClass || ""}`}
      style={{
        backgroundColor: bgColorClass ? undefined : bgColor,
        color: textColor,
      }}
    >
      {/* Coding pattern overlay - Watermark Animation */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none font-mono text-[10px] leading-none overflow-hidden text-[#243135] flex flex-col justify-between py-2">
        {[...Array(80)].map((_, i) => {
          const hash = (i * 9301 + 49297) % 233280;
          const pseudoRandom = hash.toString(36).substring(0, 6);
          return (
            <motion.div
              key={`code-row-${i}`}
              className="whitespace-nowrap inline-block"
              initial={{ x: i % 2 === 0 ? "-20%" : "0%" }}
              animate={{ x: i % 2 === 0 ? "0%" : "-20%" }}
              transition={{
                repeat: Infinity,
                duration: 30 + (i % 40),
                ease: "linear"
              }}
            >
              {`const ${["data", "config", "api", "service", "module"][i % 5]} = () => { return ${pseudoRandom}; }; `.repeat(
                50,
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Decorative Moving Pulse Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`pulse-line-${i}`}
            className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ffb400]/20 to-transparent"
            initial={{ top: "-10%", opacity: 0 }}
            animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Title Background with Right-to-Left Scroll Animation */}
      {title && (
        <TitleParallax title={title} titleColor={titleColor} />
      )}

      {/* Content Animation: Zoom and Slide */}
      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0, scale: 0.9, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "circOut" }}
      >
        {children}
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
    </div>
  );
}
