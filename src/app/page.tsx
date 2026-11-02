"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectRow from "@/components/ProjectRow";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import Footer from "@/components/Footer";
import { PORTFOLIO_SECTIONS, Project } from "@/data/portfolioData";
import { Film } from "lucide-react";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoPlayVideo, setAutoPlayVideo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenProject = (project: Project, playImmediately = false) => {
    setSelectedProject(project);
    setAutoPlayVideo(project.mediaType === "photo" ? false : playImmediately);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAutoPlayVideo(false);
  };

  // Filtered projects if user searches
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    const allProjects: Project[] = [];
    PORTFOLIO_SECTIONS.forEach((sec) => {
      sec.projects.forEach((p) => {
        if (!allProjects.some((existing) => existing.id === p.id)) {
          allProjects.push(p);
        }
      });
    });

    return allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.role && p.role.toLowerCase().includes(query)) ||
        (p.camera && p.camera.toLowerCase().includes(query)),
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#141414] text-white flex flex-col justify-between selection:bg-[#E50914] selection:text-white">
      {/* Sticky Netflix Navigation */}
      <Navbar onSearchChange={(query) => setSearchQuery(query)} />

      {searchQuery.trim() ? (
        /* Search Results View */
        <div className="pt-28 px-4 sm:px-8 md:px-12 flex-1 pb-16">
          <div className="mb-6 flex items-center gap-3">
            <Film className="w-6 h-6 text-[#E50914]" />
            <h1 className="text-xl sm:text-2xl font-bold">
              Hasil Pencarian: &ldquo;
              <span className="text-[#E50914]">{searchQuery}</span>&rdquo;
            </h1>
            <span className="text-sm text-zinc-400">
              ({searchResults.length} ditemukan)
            </span>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
              {searchResults.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onSelect={(p) => handleOpenProject(p, false)}
                  onPlay={(p) => handleOpenProject(p, true)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-400">
              <p className="text-lg">
                Tidak ada karya yang cocok dengan kata kunci tersebut.
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                Coba gunakan kata kunci seperti &quot;Commercial&quot;,
                &quot;Music Video&quot;, &quot;Wedding&quot;, &quot;RED&quot;,
                atau &quot;Sony&quot;.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Standard Netflix Homepage */
        <>
          {/* Hero Feature Showcase */}
          <Hero
            onOpenProject={(p) => handleOpenProject(p, false)}
            onPlayShowreel={(p) => handleOpenProject(p, true)}
          />

          {/* Video Poster Rows */}
          <div className="-mt-14 sm:-mt-20 md:-mt-28 relative z-20 pb-12 space-y-1">
            {PORTFOLIO_SECTIONS.map((section) => (
              <ProjectRow
                key={section.id}
                id={section.id}
                title={section.title}
                projects={section.projects}
                isLarge={section.isLarge}
                onSelectProject={(p) => handleOpenProject(p, false)}
                onPlayProject={(p) => handleOpenProject(p, true)}
              />
            ))}
          </div>
        </>
      )}

      {/* Global Project Details & Video Player Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal
          key={`${selectedProject.id}-${autoPlayVideo ? "play" : "info"}`}
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          autoPlayVideo={autoPlayVideo}
        />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
