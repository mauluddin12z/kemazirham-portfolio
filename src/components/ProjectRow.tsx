"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/portfolio";

interface ProjectRowProps {
  id: string;
  title: string;
  projects: Project[];
  isLarge?: boolean;
  onSelectProject: (project: Project) => void;
  onPlayProject: (project: Project) => void;
}

export default function ProjectRow({
  id,
  title,
  projects,
  isLarge = false,
  onSelectProject,
  onPlayProject,
}: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const { clientWidth } = rowRef.current;
    const scrollAmount = clientWidth * 0.75;

    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const onScrollCheck = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 20);
    }
  };

  return (
    <section id={id} className="mb-8 sm:mb-12 relative group/section scroll-mt-24">
      {/* Row Header */}
      <div className="px-4 sm:px-8 md:px-12 mb-2 sm:mb-3 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-2 group-hover/section:text-[#E50914] transition-colors">
          <span>{title}</span>
          <span className="text-xs text-zinc-400 font-normal hidden sm:inline">
            ({projects.length} Karya)
          </span>
        </h2>
      </div>

      {/* Row Posters Container with Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-0 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover/section:opacity-100 ${
            !showLeftArrow ? "pointer-events-none !opacity-0" : ""
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-125 transition-transform" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          onScroll={onScrollCheck}
          className="no-scrollbar flex items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden px-4 sm:px-8 md:px-12 py-3 sm:py-5 scroll-smooth"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isLarge={isLarge}
              onSelect={onSelectProject}
              onPlay={onPlayProject}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover/section:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-125 transition-transform" />
        </button>
      </div>
    </section>
  );
}

