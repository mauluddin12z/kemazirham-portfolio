"use client";

import { useState } from "react";
import { X, Check, Sparkles, Camera, Video, Film } from "lucide-react";

interface Package {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  price: string;
  priceNote: string;
  color: string;
  badge?: string;
  features: string[];
}

const PACKAGES: Package[] = [
  {
    id: "photography-basic",
    name: "Photography Basic",
    icon: <Camera className="w-5 h-5" />,
    category: "Photography",
    price: "Rp 3.500.000",
    priceNote: "per sesi",
    color: "from-violet-600 to-purple-700",
    features: [
      "Sesi pemotretan 3 jam",
      "1 lokasi / studio",
      "50 foto hasil editing",
      "File digital resolusi tinggi",
      "Pengiriman 7 hari kerja",
    ],
  },
  {
    id: "photography-premium",
    name: "Photography Premium",
    icon: <Camera className="w-5 h-5" />,
    category: "Photography",
    price: "Rp 7.500.000",
    priceNote: "per sesi",
    color: "from-violet-600 to-purple-700",
    badge: "Popular",
    features: [
      "Sesi pemotretan full day (8 jam)",
      "Hingga 3 lokasi",
      "150+ foto hasil editing",
      "File RAW + digital resolusi tinggi",
      "Cetak foto album premium",
      "Pengiriman 5 hari kerja",
    ],
  },
  {
    id: "videography-basic",
    name: "Videography Basic",
    icon: <Video className="w-5 h-5" />,
    category: "Videography",
    price: "Rp 5.000.000",
    priceNote: "per project",
    color: "from-blue-600 to-cyan-700",
    features: [
      "Produksi video 1 hari syuting",
      "Durasi video 2–3 menit",
      "Editing + color grading",
      "1 revisi",
      "Pengiriman 10 hari kerja",
    ],
  },
  {
    id: "videography-premium",
    name: "Videography Premium",
    icon: <Video className="w-5 h-5" />,
    category: "Videography",
    price: "Rp 15.000.000",
    priceNote: "per project",
    color: "from-blue-600 to-cyan-700",
    badge: "Best Value",
    features: [
      "Produksi video 2–3 hari syuting",
      "Durasi video hingga 5 menit",
      "Editing + color grading sinematik",
      "Scoring musik & sound design",
      "3 revisi",
      "Pengiriman 14 hari kerja",
    ],
  },
  {
    id: "wedding",
    name: "Wedding Package",
    icon: <Film className="w-5 h-5" />,
    category: "Wedding",
    price: "Rp 20.000.000",
    priceNote: "per acara",
    color: "from-rose-600 to-pink-700",
    badge: "Recommended",
    features: [
      "Liputan foto + video full day",
      "2 kameramen + 1 fotografer",
      "Cinematic highlight reel 5 menit",
      "Full documentation video",
      "400+ foto hasil editing",
      "Drone aerial shot",
      "5 revisi",
    ],
  },
  {
    id: "commercial",
    name: "Commercial / Ads",
    icon: <Sparkles className="w-5 h-5" />,
    category: "Commercial",
    price: "Hubungi Kami",
    priceNote: "custom quote",
    color: "from-amber-500 to-orange-600",
    features: [
      "Konsep & pre-production",
      "Syuting multi-hari",
      "Full crew profesional",
      "Peralatan cinema grade",
      "Post-production lengkap",
      "Harga sesuai kebutuhan brand",
    ],
  },
];

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PackageModal({ isOpen, onClose }: PackageModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(PACKAGES.map((p) => p.category)))];

  const filtered =
    activeCategory === "All"
      ? PACKAGES
      : PACKAGES.filter((p) => p.category === activeCategory);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Paket & Harga
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Pilih paket yang sesuai kebutuhan Anda
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors text-zinc-300 hover:text-white shrink-0"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-6 pt-5 pb-3 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#E50914] text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <div className="px-6 pb-8 pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="relative rounded-xl bg-zinc-800/60 border border-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Badge */}
              {pkg.badge && (
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#E50914] text-white px-2 py-0.5 rounded-full uppercase tracking-wide z-10">
                  {pkg.badge}
                </span>
              )}

              {/* Card Header */}
              <div className={`bg-gradient-to-br ${pkg.color} px-5 py-4`}>
                <div className="flex items-center gap-2 text-white/90 mb-2">
                  {pkg.icon}
                  <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                    {pkg.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white leading-tight">
                  {pkg.name}
                </h3>
                <div className="mt-2">
                  <span className="text-2xl font-black text-white">
                    {pkg.price}
                  </span>
                  <span className="text-white/60 text-xs ml-1">{pkg.priceNote}</span>
                </div>
              </div>

              {/* Features */}
              <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <a
                  href="https://wa.me/6285383196699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-bold py-2.5 rounded-lg transition-all duration-200 active:scale-95"
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="border-t border-white/10 px-6 py-4 text-center">
          <p className="text-xs text-zinc-500">
            Harga belum termasuk transportasi luar kota & akomodasi. Untuk paket custom,{" "}
            <a
              href="https://wa.me/6285383196699"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E50914] hover:underline"
            >
              hubungi kami langsung
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

