"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function WorldGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Store the initial clientX and clientY when pointer interaction starts
    const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
    // Store the accumulated movement for phi (horizontal) and theta (vertical)
    const rotationRef = useRef({ phi: 0, theta: 0 });

    useEffect(() => {
        let phi = 0; // Initial horizontal rotation
        let theta = 0.3; // Initial vertical tilt
        let width = 0; // To store canvas width for responsiveness

        if (!canvasRef.current) return;

        const onResize = () => {
            if (canvasRef.current) {
                // Update width for potential future use, though cobe's internal width/height are fixed
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000 * 2,
            height: 1000 * 2,
            phi: 0,
            theta: 0.3,
            scale: 0.82,
            dark: 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 2,
            baseColor: [1, 1, 1],
            markerColor: [0.1, 0.1, 0.1],
            glowColor: [0.9, 0.9, 0.9],
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.1 },
            ],
            onRender: (state) => {
                // Drag interaction
                if (!pointerInteracting.current) {
                    phi += 0.005;
                }
                state.phi = phi + rotationRef.current.phi;
                state.theta = theta + rotationRef.current.theta;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-visible pt-8 sm:pt-12 lg:pt-16">
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", aspectRatio: "1 / 1" }}
                className="w-full h-full max-w-full opacity-90 transition-opacity duration-1000 ease-in-out cursor-grab active:cursor-grabbing outline-none"
                onPointerDown={(e) => {
                    pointerInteracting.current = { x: e.clientX, y: e.clientY };
                    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const deltaX = e.clientX - pointerInteracting.current.x;
                        const deltaY = e.clientY - pointerInteracting.current.y;

                        rotationRef.current.phi = deltaX * 0.005;
                        rotationRef.current.theta = deltaY * 0.005;
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const deltaX = e.touches[0].clientX - pointerInteracting.current.x;
                        const deltaY = e.touches[0].clientY - pointerInteracting.current.y;

                        rotationRef.current.phi = deltaX * 0.005;
                        rotationRef.current.theta = deltaY * 0.005;
                    }
                }}
            />
        </div>
    );
}
