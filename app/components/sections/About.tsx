"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  ShieldCheck,
  Lightbulb,
  Workflow,
  Code2,
  Terminal as TerminalIcon,
  Sparkles,
} from "lucide-react";
import { WorldGlobe } from "../ui/WorldGlobe";
import { Logo } from "../ui/Logo";
import { BRAND_NAME } from "@/app/lib/themes";

const values = [
  {
    title: "Always Communicating",
    description:
      "Transparency is our baseline. Continuous sync loops ensure our vision and your objectives are perfectly aligned.",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Building Trust",
    description:
      "Reliability is hard-coded into our culture. We deliver on our promises with unbreakable security and data integrity.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "from-[var(--primary-color)] to-[var(--secondary-color)]",
  },
  {
    title: "Being Innovative",
    description:
      "We don't just use tools; we pioneer new ones. Our labs are constantly exploring AI, IoT, and Cloud Native frontiers.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Engineering Excellence",
    description:
      "Our code is clean, our architectures are robust, and our systems are built to withstand the test of extreme scale.",
    icon: <Workflow className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-[95%] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Text and Headings */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-widest leading-none">
                <Sparkles className="w-3 h-3" /> Core Identity
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-none">
                Who <span className="text-primary italic">We Are</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {BRAND_NAME.toUpperCase()} is a leading provider of innovative technology solutions for businesses of all sizes.
                With a focus on delivering results, we use the latest technologies and best practices to help our clients
                achieve their goals. Our team of experts is dedicated to providing exceptional service and delivering
                high-quality solutions. Whether you need help with web applications, mobile applications, or any other
                technology-related needs, we have the skills and experience to deliver the results you need. Let us help
                you transform your business and reach new heights with {BRAND_NAME.toUpperCase()}.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group relative p-8 rounded-3xl bg-secondary/20 hover:shadow-2xl shadow-black/10 backdrop-blur-sm overflow-hidden"
                >
                  {/* Gradient Blob Background */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />

                  <div className="relative z-10">
                    {/* Icon with Zoom In/Out Animation */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white shadow-lg mb-6`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {value.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Watermark Number Removed */}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Interactive Cobe Globe */}
          <div className="lg:w-1/2 relative flex justify-center items-center h-[600px]">
            {/* Valaiyagam logo watermark inside/behind globe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 ml-24 mt-12">
              <Logo variant="watermark" />
            </div>

            <div className="relative w-full max-w-[700px] aspect-square select-none z-10">
              <WorldGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
