"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

export function Hero({ id }: { id?: string }) {
    return (
        <section id={id} className="relative w-full h-screen bg-white overflow-hidden flex items-center pt-0">

            {/* Background Coding Animation */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-xs leading-tight overflow-hidden text-[#243135] z-0 flex flex-col justify-between">
                {[...Array(100)].map((_, i) => {
                    const hash = (i * 9301 + 49297) % 233280;
                    const pseudoRandom = hash.toString(36).substring(0, 6);
                    return (
                        <motion.div
                            key={i}
                            className="whitespace-nowrap"
                            initial={{ x: 0 }}
                            animate={{ x: i % 2 === 0 ? -20 : 20 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 100 + i }}
                        >
                            {`const ${["data", "config", "api", "service", "module"][i % 5]} = () => { return ${pseudoRandom}; }; `.repeat(
                                20,
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Fixed Triangle Background View */}
            <div
                className="absolute inset-0 hero-diagonal-primary"
                style={{
                    clipPath: "polygon(100% 0, 100% 100%, 45% 100%)",
                    zIndex: 1
                }}
            />
            <div
                className="absolute inset-0 hero-diagonal-secondary"
                style={{
                    clipPath: "polygon(100% 0, 100% 100%, 35% 100%)",
                    zIndex: 1
                }}
            />

            {/* Main Content Container */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 w-full mt-10">
                <div className="grid lg:grid-cols-2 items-center gap-12">
                    {/* Left Side: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-8xl font-extrabold text-[#1f2937] leading-[0.95] tracking-tighter">
                                Grow Your <br />
                                <span className="hero-highlight">
                                    Business
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                                Empower your business with our expert team and exceptional service.
                                Our passion for delivering results drives everything we do.
                                Partner with us for the best experience in the industry.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <Button
                                className="rounded-full btn-primary-cta border-0 px-10 h-16 text-lg font-bold shadow-xl shadow-primary/25"
                            >
                                Get Started <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <div className="flex items-center gap-4 cursor-pointer group px-4 py-2 rounded-full btn-secondary-cta">
                                <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                                <span className="font-bold">Explore Work</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
