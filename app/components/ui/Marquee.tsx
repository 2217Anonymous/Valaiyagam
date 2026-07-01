"use client";

import React from "react";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  items,
  speed = 30,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden py-8 select-none ${className}`}>
      <div
        className={`flex whitespace-nowrap animate-marquee ${reverse ? "flex-row-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Render items twice for seamless loop */}
        <div className="flex shrink-0 items-center justify-around min-w-full gap-12 px-6">
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-around min-w-full gap-12 px-6">
          {items.map((item, i) => (
            <div key={`second-${i}`} className="flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
