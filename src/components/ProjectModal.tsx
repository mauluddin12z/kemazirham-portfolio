"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Plus,
  Check,
  ThumbsUp,
  Volume2,
  VolumeX,
  Camera,
  ExternalLink,
  Play,
} from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  autoPlayVideo?: boolean;
}

/** Helper: deteksi jenis URL video */
function getVideoEmbedUrl(url: string, autoplay: boolean): string {
  // Sudah dalam format embed
  if (url.includes("/embed/")) {
    return autoplay && !url.includes("autoplay")
      ? `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
      : url.replace("autoplay=0", "autoplay=1");
  }
  // YouTube watch URL → embed
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=${autoplay ? 1 : 0}&rel=0`;
  }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=${autoplay ? 1 : 0}`;
  }
  // Kembalikan as-is (misal direct .mp4 atau URL embed lain)
  return url;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  autoPlayVideo = false,
}: ProjectModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isPhoto = project?.mediaType === "photo";
  const hasVideo = !isPhoto && !!project?.videoUrl;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsPlaying(!isPhoto && autoPlayVideo);
    } else {
      document.body.style.overflow = "auto";
      setIsPlaying(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, autoPlayVideo, isPhoto, onClose]);

  if (!isOpen || !project) return null;

  const embedUrl = hasVideo
    ? getVideoEmbedUrl(project.videoUrl!, isPlaying)
    : null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-enter relative w-full max-w-3xl sm:max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl border border-zinc-800 my-auto text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── Media Section ── */}
        <div className="relative w-full h-64 sm:h-96 md:h-[430px] bg-black overflow-hidden">
          {isPlaying && embedUrl ? (
            /* ── Real Video Player via iframe ── */
            <iframe
              src={embedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            /* ── Poster / Thumbnail ── */
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
              <div className="absolute inset-0 bg-black/20" />

              {/* Big centered play button overlay (for videos with URL) */}
              {hasVideo && !isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group/play"
                  aria-label="Putar video"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover/play:bg-[#E50914] group-hover/play:border-[#E50914] transition-all duration-300 shadow-2xl">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1" />
                  </div>
                </button>
              )}
            </>
          )}

          {/* ── Bottom HUD (only when NOT playing) ── */}
          {!isPlaying && (
            <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none">
              {isPhoto && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#E50914] text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide flex items-center gap-1 pointer-events-none">
                    <Camera className="w-3 h-3" /> STILL PHOTOGRAPHY
                  </span>
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-4">
                {project.title}
              </h2>

              {/* Action buttons (re-enable pointer events) */}
              <div className="flex items-center gap-3 pointer-events-auto">
                {/* Play / Open-photo CTA */}
                {!isPhoto ? (
                  hasVideo ? (
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="bg-white hover:bg-white/85 text-black px-6 sm:px-8 py-2.5 rounded-md flex items-center gap-2 font-bold text-sm sm:text-base transition-all active:scale-95 shadow-lg"
                    >
                      <Play className="w-5 h-5 fill-black" />
                      <span>Putar</span>
                    </button>
                  ) : (
                    <span className="text-zinc-400 text-xs italic">Video tidak tersedia</span>
                  )
                ) : (
                  <a
                    href={project.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-white/85 text-black px-5 sm:px-7 py-2.5 rounded-md flex items-center gap-2 font-bold text-sm sm:text-base transition-all active:scale-95 shadow-lg"
                  >
                    <Camera className="w-4 h-4 text-black" />
                    <span>Buka Foto HD</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-600 ml-0.5" />
                  </a>
                )}

                {/* Save */}
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="w-10 h-10 rounded-full border border-zinc-400 bg-black/40 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all"
                  title={isSaved ? "Tersimpan" : "Simpan ke Favorit"}
                >
                  {isSaved ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>

                {/* Like */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-full border border-zinc-400 bg-black/40 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all ${
                    isLiked ? "border-[#E50914] text-[#E50914]" : ""
                  }`}
                  title="Sukai Karya Ini"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>

                {/* Audio (videos only) */}
                {!isPhoto && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 rounded-full border border-zinc-400 bg-black/40 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all ml-auto"
                    title={isMuted ? "Aktifkan Audio" : "Matikan Audio"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Stop button while playing */}
          {isPlaying && (
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 left-4 z-30 bg-black/60 hover:bg-black/90 text-white border border-white/20 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all"
            >
              ✕ Tutup Player
            </button>
          )}
        </div>

        {/* ── Modal Content Body ── */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-10">
          {/* Main Info Column */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm mb-4">
              <span className="text-emerald-400 font-bold">
                {project.matchScore ?? 98}% Cocok
              </span>
              <span className="text-zinc-300 font-medium">{project.year}</span>
              {!isPhoto ? (
                <>
                  <span className="border border-zinc-600 px-1.5 py-0.5 text-zinc-300 rounded text-[10px] font-semibold">
                    4K HDR
                  </span>
                  <span className="border border-zinc-600 px-1.5 py-0.5 text-zinc-300 rounded text-[10px] font-semibold">
                    Dolby Vision
                  </span>
                  {project.duration && (
                    <span className="text-zinc-400 text-xs">{project.duration}</span>
                  )}
                </>
              ) : (
                <>
                  <span className="border border-zinc-600 px-1.5 py-0.5 text-zinc-300 rounded text-[10px] font-semibold">
                    RAW 16-BIT
                  </span>
                  <span className="border border-zinc-600 px-1.5 py-0.5 text-zinc-300 rounded text-[10px] font-semibold">
                    HIGH RES STILL
                  </span>
                  <span className="border border-zinc-600 px-1.5 py-0.5 text-zinc-300 rounded text-[10px] font-semibold">
                    DCI-P3
                  </span>
                </>
              )}
            </div>

            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {project.description}
            </p>

            <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800 text-xs sm:text-sm text-zinc-300">
              <p className="font-semibold text-white mb-1">
                {isPhoto ? "Catatan Fotografer:" : "Catatan Sutradara / DoP:"}
              </p>
              <p className="text-zinc-400">
                {isPhoto
                  ? "Karya fotografi ini ditangkap dengan fokus mendalam pada komposisi, pencahayaan alami/studio, dan tekstur sensor format medium. Tersedia untuk lisensi komersial dan cetak fine-art beresolusi tinggi."
                  : "Setiap frame dirancang dengan cermat untuk menyampaikan emosi dan narasi visual yang otentik. Tersedia untuk pengiriman file master ProRes 4444 XQ dan DCI 4K."}
              </p>
            </div>
          </div>

          {/* Metadata Sidebar Column */}
          <div className="md:w-72 flex flex-col gap-3.5 text-xs sm:text-sm border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6 text-zinc-400">
            <div>
              <span className="text-zinc-500 block text-xs">Format:</span>
              <span className="text-white font-medium">
                {isPhoto ? "Still Photography" : "Motion Picture / Cinema"}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-xs">Kategori:</span>
              <span className="text-white font-medium">{project.category}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-xs">Peran:</span>
              <span className="text-white font-medium">
                {project.role ?? (isPhoto ? "Lead Photographer" : "Director of Photography, Editor")}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-xs">Kamera & Lensa:</span>
              <span className="text-white font-medium">
                {project.camera ?? "Leica / Hasselblad Prime Lenses"}
              </span>
            </div>
            {!isPhoto && project.videoUrl && (
              <div>
                <span className="text-zinc-500 block text-xs mb-1">Tonton di:</span>
                <a
                  href={project.videoUrl.replace("/embed/", "/watch?v=").replace("autoplay=1&", "").replace("?autoplay=1", "").replace("&rel=0", "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#E50914] hover:underline text-xs font-medium"
                >
                  <ExternalLink className="w-3 h-3" /> Buka di YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
