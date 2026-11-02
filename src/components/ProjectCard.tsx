"use client";

import { useState } from "react";
import { Play, Plus, Check, ChevronDown, Camera } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  isLarge?: boolean;
  onSelect: (project: Project) => void;
  onPlay: (project: Project) => void;
}

export default function ProjectCard({
  project,
  isLarge = false,
  onSelect,
  onPlay,
}: ProjectCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isPhoto = project.mediaType === "photo";

  const fallbackImage =
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1770&auto=format&fit=crop";

  return (
    <div
      onClick={() => onSelect(project)}
      className={`group relative shrink-0 cursor-pointer rounded-md overflow-hidden bg-zinc-900 transition-all duration-300 ease-out select-none ${
        isLarge
          ? "w-[240px] sm:w-[320px] md:w-[380px] h-[140px] sm:h-[185px] md:h-[220px]"
          : "w-[190px] sm:w-[250px] md:w-[290px] h-[115px] sm:h-[150px] md:h-[170px]"
      } hover:scale-105 sm:hover:scale-110 hover:z-30 hover:shadow-2xl hover:shadow-black/80 hover:ring-2 hover:ring-white/20`}
    >
      {/* Poster Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgError ? fallbackImage : project.imageUrl}
        alt={project.title}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:brightness-110"
        loading="lazy"
      />

      {/* Subtle Default Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />

      {/* Title Overlay in Default State */}
      <div className="absolute bottom-2 left-3 right-3 group-hover:opacity-0 transition-opacity">
        <p className="text-white text-xs sm:text-sm font-semibold truncate drop-shadow">
          {project.title}
        </p>
      </div>

      {/* Hover Information Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 sm:p-4">
        <div className="flex items-center gap-1.5 mb-1">
          {isPhoto && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/20 text-white px-1.5 py-0.5 rounded flex items-center gap-1">
              <Camera className="w-2.5 h-2.5" /> Foto
            </span>
          )}
          <h4 className="text-white font-bold text-xs sm:text-sm leading-tight truncate drop-shadow">
            {project.title}
          </h4>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 mb-2">
          {!isPhoto ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay(project);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80 transition-transform active:scale-90"
              title="Putar"
            >
              <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80 transition-transform active:scale-90"
              title="Lihat Foto"
            >
              <Camera className="w-3.5 h-3.5 text-black" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors active:scale-90"
            title={isSaved ? "Hapus dari Daftar" : "Simpan ke Daftar"}
          >
            {isSaved ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Plus className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-400 text-white ml-auto flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors active:scale-90"
            title="Info Detail"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Metadata Line */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="text-emerald-400 font-bold">
            {project.matchScore ?? 98}% Cocok
          </span>
          <span className="text-gray-300 border border-gray-600 px-1 rounded text-[9px]">
            {project.year}
          </span>
          <span className="text-gray-400 truncate max-w-[90px] sm:max-w-[120px]">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
}

