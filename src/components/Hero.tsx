"use client";

import React from "react";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { HERO_PROJECT, Project } from "@/data/portfolioData";
import Image from "next/image";

interface HeroProps {
  onOpenProject: (project: Project) => void;
  onPlayShowreel: (project: Project) => void;
}

export default function Hero({ onOpenProject, onPlayShowreel }: HeroProps) {
  const [isMuted, setIsMuted] = React.useState(true);

  return (
    <header className="relative w-full h-[85vh] sm:h-[90vh] bg-cover bg-center overflow-hidden flex items-end pb-24 sm:pb-32">
      {/* Background Image Banner */}
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105">
        {/* Subtle Dark Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[512px] aspect-auto opacity-80">
          <Image
            src="/hero-photo.png"
            alt="Hero Background"
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Hero Content Information */}
      <div className="relative z-20 px-4 sm:px-8 md:px-12 w-full max-w-3xl">
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] drop-shadow-2xl">
          {HERO_PROJECT.title}
        </h1>

        {/* Synopsis Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 drop-shadow-md font-medium leading-relaxed line-clamp-3 md:line-clamp-4 max-w-2xl">
          {HERO_PROJECT.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => onPlayShowreel(HERO_PROJECT)}
            className="bg-white hover:bg-white/85 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-md flex items-center gap-2.5 font-bold text-base sm:text-lg transition-all duration-200 shadow-xl active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-black" />
            <span>Putar</span>
          </button>

          <a
            href="https://wa.me/6285383196699"
            className="bg-blue-600 hover:bg-zinc-700/60 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md flex items-center gap-2.5 font-bold text-base sm:text-lg backdrop-blur-md transition-all duration-200 shadow-xl active:scale-95 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <span>Order now</span>
          </a>
        </div>
      </div>

      {/* Netflix Bottom Gradient Blend */}
      <div className="hero-fade-bottom absolute bottom-0 left-0 right-0 h-32 sm:h-48 pointer-events-none z-10" />
    </header>
  );
}
