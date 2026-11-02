import React from "react";
import { Mail, Film, Video, PhoneIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#101010] text-zinc-500 py-12 px-4 sm:px-8 md:px-12 border-t border-zinc-900 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Brand & Bio */}
        <div className="text-center md:text-left max-w-sm">
          <a
            href="#"
            className="text-2xl font-black tracking-tighter block mb-2 transition-transform hover:scale-105 inline-block"
          >
            <span className="text-[#E50914]">KEMAZ</span>
            <span className="text-white">IRHAM</span>
          </a>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
            Director of Photography & Sinematografer berbasis di Indonesia.
            Membawa visi naratif dan visual Anda ke standar layar lebar.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Tersedia untuk Kolaborasi Global & Komersial
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-col items-center md:items-start text-xs sm:text-sm space-y-2 text-zinc-400">
          <span className="text-white font-semibold mb-1 text-sm tracking-wide">
            Kategori Karya
          </span>
          <a href="#commercials" className="hover:text-white transition-colors">
            Commercials & Ads
          </a>
          <a
            href="#music-videos"
            className="hover:text-white transition-colors"
          >
            Music Videos
          </a>
          <a href="#weddings" className="hover:text-white transition-colors">
            Cinematic Weddings
          </a>
          <a href="#events" className="hover:text-white transition-colors">
            Events & Festivals
          </a>
          <a href="#photography" className="hover:text-white transition-colors">
            Editorial Photography
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-end">
          <span className="text-white font-semibold mb-3 text-xs sm:text-sm tracking-wide">
            Terhubung
          </span>
          <div className="flex items-center gap-3">
            {/* Instagram SVG */}
            <a
              href="https://www.instagram.com/kemazirham/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#E50914] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-zinc-800"
              aria-label="Instagram"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="https://wa.me/6285383196699"
              className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#E50914] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-zinc-800"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <PhoneIcon className="w-4 h-4" />
            </a>
          </div>
          <span className="text-[11px] text-zinc-500 mt-3">
            contact@kemazirham.com
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-3">
        <p>&copy; 2026 Kemaz Irham Cinematography. All rights reserved.</p>
        <p className="flex items-center gap-1.5 text-zinc-400">
          <Video className="w-3.5 h-3.5 text-[#E50914]" /> Dibuat dengan format
          Sinematik Netflix Style di Next.js
        </p>
      </div>
    </footer>
  );
}
