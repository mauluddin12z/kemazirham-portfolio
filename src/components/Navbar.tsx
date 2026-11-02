"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, Menu, X } from "lucide-react";

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
  };

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
          ? "bg-[#141414]/95 backdrop-blur-md shadow-lg shadow-black/60"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Brand Logo */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-black tracking-tighter transition-transform hover:scale-105 select-none"
        >
          <span className="text-[#E50914]">KEMAZ</span>
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
        <div className="absolute top-full left-0 right-0 bg-[#141414]/98 backdrop-blur-xl border-b border-white/10 p-5 md:hidden shadow-2xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-200 hover:text-[#E50914] py-2 text-base font-medium border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
