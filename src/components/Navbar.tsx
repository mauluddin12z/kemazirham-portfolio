"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Commercials", href: "#commercials" },
    { name: "Music Videos", href: "#music-videos" },
    { name: "Weddings", href: "#weddings" },
    { name: "Events", href: "#events" },
    { name: "Photography", href: "#photography" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-in-out px-4 sm:px-8 md:px-12 py-3.5 flex items-center justify-between ${
        isScrolled
          ? "bg-netflix-dark/95 backdrop-blur-md shadow-lg shadow-black/60"
          : "bg-linear-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Brand Logo */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-black tracking-tighter transition-transform hover:scale-105 select-none"
        >
          <span className="text-netflix-red">KEMAZ</span>
          <span className="text-white">IRHAM</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4 text-gray-200">
        {/* Search Input */}
        <div className="hidden sm:flex items-center gap-2 bg-black/40 border border-white/20 rounded-md px-3 py-1.5">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Cari karya..."
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-36 focus:w-48 transition-all duration-300"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-gray-300 hover:text-white"
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-netflix-dark/98 backdrop-blur-xl border-b border-white/10 p-5 md:hidden shadow-2xl flex flex-col gap-3">
          {/* Mobile Search */}
          <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded-md px-3 py-2 mb-2">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Cari karya..."
              className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
            />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-200 hover:text-netflix-red py-2 text-base font-medium border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
