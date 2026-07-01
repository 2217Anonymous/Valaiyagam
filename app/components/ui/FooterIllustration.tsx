"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FooterIllustrationProps {
    children?: React.ReactNode;
}

export function FooterIllustration({ children }: FooterIllustrationProps) {
    const [hasRevealed, setHasRevealed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasRevealed(true);
                } else {
                    setHasRevealed(false);
                }
            },
            { threshold: 0.1 }
        );
        // Elements outside a component tree (in separate parent) need global document query 
        // or passed ref. Query is totally fine for this singleton footer.
        const trigger = document.getElementById("footer-reveal-trigger");
        if (trigger) observer.observe(trigger);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full relative bg-[#FFF9F5] min-h-[500px] overflow-hidden flex flex-col justify-end">

            {/* Landscape SVG Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <svg
                    viewBox="0 0 1440 600"
                    className="w-full h-full object-cover"
                    preserveAspectRatio="xMidYMax slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="sun-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FBAB7E" />
                            <stop offset="100%" stopColor="#F7CE68" />
                        </linearGradient>
                        <linearGradient id="hill-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FEEAD2" />
                            <stop offset="100%" stopColor="#FFF9F5" />
                        </linearGradient>
                        <linearGradient id="hill-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FDE3C6" />
                            <stop offset="100%" stopColor="#FFF9F5" />
                        </linearGradient>
                    </defs>

                    {/* Sun - Centered and Larger */}
                    <motion.circle
                        cx="720"
                        cy="400"
                        r="150"
                        fill="url(#sun-gradient)"
                        initial={{ y: 200, opacity: 0 }}
                        animate={hasRevealed ? { y: 0, opacity: 0.8 } : { y: 200, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Birds */}
                    <motion.g
                        initial={{ x: -50, opacity: 0 }}
                        animate={hasRevealed ? { x: 0, opacity: 0.6 } : { x: -50, opacity: 0 }}
                        transition={{ duration: 2, delay: 0.5 }}
                    >
                        <path d="M550 200 Q 560 210 570 200" stroke="#8B5E3C" strokeWidth="2" fill="none" />
                        <path d="M580 190 Q 590 200 600 190" stroke="#8B5E3C" strokeWidth="2" fill="none" />
                        <path d="M900 220 Q 910 230 920 220" stroke="#8B5E3C" strokeWidth="2" fill="none" />
                    </motion.g>

                    {/* Clouds */}
                    <g fill="#FEEAD2" opacity="0.4">
                        <circle cx="200" cy="150" r="50" />
                        <circle cx="250" cy="150" r="70" />
                        <circle cx="300" cy="160" r="50" />

                        <circle cx="1100" cy="130" r="50" />
                        <circle cx="1160" cy="120" r="60" />
                        <circle cx="1220" cy="130" r="50" />
                    </g>

                    {/* Background Mountains/Hills */}
                    <path d="M0 600 L0 450 C 300 350, 500 500, 720 500 S 1100 350, 1440 450 L 1440 600 Z" fill="url(#hill-gradient-2)" />

                    {/* Foreground Dunes - Lower to allow content */}
                    <path d="M0 600 L0 520 C 300 560, 600 480, 800 520 S 1200 480, 1440 540 L 1440 600 Z" fill="url(#hill-gradient-1)" />
                </svg>
            </div>

            {/* Content Wrapper (Z-Index above SVG) */}
            <div className="relative z-10 w-full pb-12">
                {children}
            </div>
        </div>
    );
}
