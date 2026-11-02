"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectRow from "@/components/ProjectRow";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import Footer from "@/components/Footer";
import { Project, SectionCategory } from "@/types/portfolio";
import { Film } from "lucide-react";

export default function Home() {
  const [sections, setSections] = useState<SectionCategory[]>([]);
  const [heroProject, setHeroProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoPlayVideo, setAutoPlayVideo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil seluruh data langsung dari Strapi CMS
  useEffect(() => {
    async function loadStrapiData() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (data?.sections && Array.isArray(data.sections)) {
            setSections(data.sections);
          }
          if (data?.heroProject) {
            setHeroProject(data.heroProject);
          }
        }
      } catch (err) {
        console.error("Gagal memuat data dari Strapi CMS:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStrapiData();
  }, []);
  const handleOpenProject = (project: Project, playImmediately = false) => {
    setSelectedProject(project);
    setAutoPlayVideo(project.mediaType === "photo" ? false : playImmediately);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAutoPlayVideo(false);
  };

  // Filter hasil pencarian
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    const allProjects: Project[] = [];
    sections.forEach((sec) => {
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
  }, [searchQuery, sections]);

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
            heroProject={heroProject}
            onPlayShowreel={(p) => handleOpenProject(p, true)}
          />

          {/* Video Poster Rows */}
          <div className="-mt-14 sm:-mt-20 md:-mt-28 relative z-20 pb-12 space-y-1">
            {isLoading ? (
              /* Netflix Loading Skeleton Shimmer */
              <div className="px-4 sm:px-8 md:px-12 space-y-8 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="space-y-3">
                    <div className="h-6 w-48 bg-zinc-800 rounded" />
                    <div className="flex gap-4 overflow-hidden">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-[240px] sm:w-[280px] h-[150px] bg-zinc-800/60 rounded-md shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : sections.length > 0 ? (
              sections.map((section) => (
                <ProjectRow
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  projects={section.projects}
                  isLarge={section.isLarge}
                  onSelectProject={(p) => handleOpenProject(p, false)}
                  onPlayProject={(p) => handleOpenProject(p, true)}
                />
              ))
            ) : (
              <div className="text-center py-20 text-zinc-500 text-sm">
                <p>Belum ada project yang dipublikasikan di Strapi CMS.</p>
                <p className="text-xs mt-1">
                  Buka Strapi Admin (<code>http://localhost:1337/admin</code>)
                  untuk menambah konten.
                </p>
              </div>
            )}
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
