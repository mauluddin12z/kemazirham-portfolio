"use client";

import { useState, useEffect } from "react";
import { X, Check, Sparkles, Camera, Video, Film, Loader2 } from "lucide-react";
import { PricingPackage } from "@/types/portfolio";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackages?: PricingPackage[];
}

function getPackageIcon(category: string, iconName?: string) {
  const key = (iconName || category).toLowerCase();
  if (key.includes("camera") || key.includes("photo")) {
    return <Camera className="w-5 h-5" />;
  }
  if (key.includes("video")) {
    return <Video className="w-5 h-5" />;
  }
  if (key.includes("film") || key.includes("wedding")) {
    return <Film className="w-5 h-5" />;
  }
  return <Sparkles className="w-5 h-5" />;
}

function getPackageGradient(category: string, color?: string) {
  if (color && color.trim()) {
    return color;
  }
  const key = category.toLowerCase();
  if (key.includes("photo")) return "from-violet-600 to-purple-700";
  if (key.includes("video")) return "from-blue-600 to-cyan-700";
  if (key.includes("wedding")) return "from-rose-600 to-pink-700";
  if (key.includes("commercial")) return "from-amber-500 to-orange-600";
  return "from-zinc-700 to-zinc-800";
}

export default function PackageModal({
  isOpen,
  onClose,
  initialPackages = [],
}: Readonly<PackageModalProps>) {
  const [packages, setPackages] = useState<PricingPackage[]>(initialPackages);
  const [isLoading, setIsLoading] = useState<boolean>(
    initialPackages.length === 0,
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const loadPackages = async () => {
      try {
        const res = await fetch(`/api/packages?_t=${Date.now()}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data: PricingPackage[] = await res.json();
          if (isMounted) {
            setPackages(data);
          }
        }
      } catch (err) {
        console.error("Gagal memuat paket dari Strapi:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPackages();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    "All",
    ...Array.from(new Set(packages.map((p) => p.category).filter(Boolean))),
  ];

  const filtered =
    activeCategory === "All"
      ? packages
      : packages.filter((p) => p.category === activeCategory);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-modal-title"
    >
      {/* Clickable Backdrop to close modal */}
      <button
        type="button"
        aria-label="Tutup modal"
        tabIndex={-1}
        className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2
              id="package-modal-title"
              className="text-xl sm:text-2xl font-black text-white tracking-tight"
            >
              Paket &amp; Harga Layanan
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Pilih paket sinematografi &amp; fotografi sesuai kebutuhan proyek
              Anda
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="px-6 pt-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-netflix-red text-white shadow-lg shadow-netflix-red/30"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-netflix-red" />
              <p className="text-sm font-medium">
                Memuat paket dari Strapi CMS...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-zinc-500 text-sm">
              <p>Belum ada paket yang dipublikasikan di Strapi CMS.</p>
              <p className="text-xs mt-1 text-zinc-600">
                Kelola paket melalui Strapi Admin di menu <code>Packages</code>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => {
                const gradient = getPackageGradient(pkg.category, pkg.color);
                const icon = getPackageIcon(pkg.category, pkg.icon);
                const waMessage = encodeURIComponent(
                  `Halo Kemazirham, saya tertarik dengan paket "${pkg.name}" (${pkg.price}${
                    pkg.priceNote ? ` - ${pkg.priceNote}` : ""
                  }). Boleh minta info detail dan ketersediaan jadwal?`,
                );
                const waLink = `https://wa.me/6285383196699?text=${waMessage}`;

                return (
                  <div
                    key={pkg.id}
                    className="relative flex flex-col rounded-xl bg-zinc-800/50 border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Badge */}
                    {pkg.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-netflix-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          {pkg.badge}
                        </span>
                      </div>
                    )}

                    {/* Gradient Header */}
                    <div
                      className={`p-5 bg-linear-to-r ${gradient} text-white`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-black/20 backdrop-blur-xs">
                          {icon}
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                          {pkg.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight">
                        {pkg.name}
                      </h3>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-2xl font-black">{pkg.price}</span>
                        {pkg.priceNote && (
                          <span className="text-xs text-white/80">
                            / {pkg.priceNote}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300 mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-2.5 px-4 rounded-lg bg-white/10 hover:bg-netflix-red text-white text-xs sm:text-sm font-bold transition-all duration-200 group-hover:bg-netflix-red shadow-md active:scale-95"
                      >
                        Pesan Sekarang
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="border-t border-white/10 px-6 py-4 bg-zinc-950/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <span>
            * Harga dapat berubah sewaktu-waktu tergantung kebutuhan khusus
            proyek Anda.
          </span>
          <a
            href="https://wa.me/6285383196699?text=Halo%20Kemazirham%2C%20saya%20ingin%20konsultasi%20custom%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-netflix-red hover:underline font-semibold shrink-0"
          >
            Konsultasi Custom Project &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
