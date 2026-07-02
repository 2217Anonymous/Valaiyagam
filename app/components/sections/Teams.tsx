"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Dribbble } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const team = [
  {
    name: "Angelo Walking",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Eden Wooderburg",
    role: "Creative Head",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Alex Morgan",
    role: "Senior Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
  },
];

export function Teams() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(1);

  // Handle window resize safely
  useEffect(() => {
    const handleResize = () => {
      setItemsPerScreen(window.innerWidth >= 768 ? 2 : 1);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(team.length));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(team.length)) % Math.ceil(team.length));
  };

  return (
    <section id="teams" className="py-16 sm:py-20 lg:py-24 bg-primary text-white overflow-hidden relative">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

          {/* Left Side: Content & Navigation */}
          <div className="lg:w-1/3 space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 sm:mb-6">
                We Have <br />
                Amazing Team
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-md">
                We are a group of passionate individuals delivering the best software solutions.
                Our team is our greatest asset, driving innovation and excellence in every project.
              </p>
            </motion.div>

            {/* Navigation Buttons for Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Side: Carousel */}
          <div className="lg:w-2/3 w-full relative">
            <div className="overflow-hidden p-4">
              <motion.div
                className="flex gap-6"
                animate={{ x: `-${currentIndex * (100 / itemsPerScreen)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className="min-w-full sm:min-w-[calc(50%-12px)] flex-shrink-0 bg-white rounded-none shadow-xl overflow-hidden group"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay with Socials */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a href="#" className="p-2 bg-white rounded-full text-black hover:bg-primary hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="p-2 bg-white rounded-full text-black hover:bg-primary hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="p-2 bg-white rounded-full text-black hover:bg-primary hover:text-white transition-colors"><Dribbble size={20} /></a>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Nav */}
            <div className="flex lg:hidden justify-center items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
