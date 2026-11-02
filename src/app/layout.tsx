import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KEMAZ IRHAM | Cinematic Portfolio",
  description: "Portofolio Sinematografi & Videografi Kemaz Irham - Director of Photography, Komersial, Video Musik, & Film.",
  keywords: ["Kemaz Irham", "Cinematography", "Videography", "Director of Photography", "Showreel", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="bg-[#141414] text-white antialiased selection:bg-[#E50914] selection:text-white">
        {children}
      </body>
    </html>
  );
}
