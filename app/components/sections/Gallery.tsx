"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const categories = [
  "ALL",
  "WEB DESIGN",
  "LOGO DESIGN",
  "MOBILE APP",
  "DEVELOPMENT",
];

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070", // Purple/Cosmic vibe
    title: "Cosmic Aesthetics",
    category: "WEB DESIGN",
  },
  {
    url: "https://images.unsplash.com/photo-1524169358666-79f22534bc6e?q=80&w=2070", // Teal/Blue vibe
    title: "Clean Architecture",
    category: "DEVELOPMENT",
  },
  {
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070", // Retro/Tech
    title: "Retro Gadgets",
    category: "WEB DESIGN",
  },
  {
    url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001", // Circuit
    title: "Circuit Board",
    category: "DEVELOPMENT",
  },
  {
    url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974", // Mobile
    title: "Mobile Interface",
    category: "MOBILE APP",
  },
  {
    url: "https://images.unsplash.com/photo-1614064641938-3bcee5297429?q=80&w=2070", // Abstract
    title: "Abstract Art",
    category: "LOGO DESIGN",
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    activeCategory === "ALL"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const leftColImages = filteredImages.filter((_, i) => i % 2 === 0);
  const rightColImages = filteredImages.filter((_, i) => i % 2 !== 0);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column: Title, Filters, Even Images */}
          <div className="flex flex-col space-y-12">

            {/* Header Area */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-black uppercase text-foreground leading-[0.9]">
                  OUR <br />
                  AMAZING PORTFOLIO
                </h2>
              </motion.div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    suppressHydrationWarning
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm font-bold uppercase tracking-wider transition-colors relative ${activeCategory === cat
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Left Column Images */}
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {leftColImages.map((image) => (
                  <motion.div
                    layout
                    key={image.url}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative aspect-4/3 bg-muted overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                      <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {image.title}
                      </h3>
                      <p className="text-primary font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {image.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Odd Images */}
          <div className="flex flex-col space-y-8">
            <AnimatePresence mode="popLayout">
              {rightColImages.map((image) => (
                <motion.div
                  layout
                  key={image.url}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-4/3 bg-muted overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title}
                    </h3>
                    <p className="text-primary font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {image.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              suppressHydrationWarning
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={48} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-[85vh] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
            >
              <Image
                src={selectedImage}
                alt="Selected Portfolio Item"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
