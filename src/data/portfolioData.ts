export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  year: string;
  category: string;
  role?: string;
  camera?: string;
  matchScore?: number;
  duration?: string;
  mediaType?: "video" | "photo";
  /** URL YouTube, Vimeo, atau URL direct .mp4 */
  videoUrl?: string;
}

export interface SectionCategory {
  id: string;
  title: string;
  isLarge?: boolean;
  projects: Project[];
}

export const HERO_PROJECT: Project = {
  id: "hero-showreel",
  title: "Kemazirham Cinematography",
  description:
    "Kompilasi karya sinematografi terbaik, menggabungkan cerita visual yang kuat, pencahayaan dramatis, dan komposisi yang memukau. Menghidupkan setiap momen menjadi sebuah mahakarya sinema.",
  year: "2026",
  category: "Showreel",
  role: "Director of Photography, Colorist & Editor",
  camera: "RED V-Raptor 8K VV & Arri Signature Primes",
  matchScore: 99,
  duration: "3m 45s",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
};

export const PORTFOLIO_SECTIONS: SectionCategory[] = [
  {
    id: "commercials",
    title: "Top Commercials",
    isLarge: true,
    projects: [
      {
        id: "comm-1",
        title: "Urban Runner",
        description:
          "Iklan komersial untuk brand sepatu olahraga ternama. Menekankan dinamisme pergerakan di lanskap urban megapolitan dengan transisi kecepatan tinggi dan pencahayaan dinamis.",
        imageUrl:
          "https://lh3.googleusercontent.com/d/1zbvYrtPNVvgueyHRCVy4SJTeI-hzX1W5=s220",
        year: "2025",
        category: "Commercial",
        role: "Director of Photography",
        camera: "Sony FX6 & anamorphic Cooke Anamorphic/i",
        matchScore: 98,
        videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&rel=0",
      },
      {
        id: "comm-2",
        title: "Midnight Vogue",
        description:
          "Fashion film pendek yang ditayangkan secara eksklusif pada Paris Fashion Week. Eksplorasi bayangan dramatis, siluet elegan, dan tekstur kain mewah.",
        imageUrl:
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1771&auto=format&fit=crop",
        year: "2024",
        category: "Fashion Film",
        role: "Cinematographer & Lighting Director",
        camera: "ARRI Alexa Mini LF",
        matchScore: 96,
        videoUrl: "https://www.youtube.com/embed/ZSM3w1v-A_Y?autoplay=1&rel=0",
      },
      {
        id: "comm-3",
        title: "Neon Tech",
        description:
          "Peluncuran produk teknologi hardware flagship terbaru dengan estetika cyberpunk, perpaduan lampu neon praktikal dan CGI integration yang mulus.",
        imageUrl:
          "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1674&auto=format&fit=crop",
        year: "2025",
        category: "Product Launch",
        role: "Director of Photography",
        camera: "RED Monstro 8K",
        matchScore: 97,
        videoUrl: "https://www.youtube.com/embed/9No-FiEInLA?autoplay=1&rel=0",
      },
      {
        id: "comm-4",
        title: "Drive Into Dusk",
        description:
          "Iklan otomotif mewah yang direkam di lintasan pegunungan Alpen saat golden hour dan blue hour dengan car-rig khusus dan drone FPV berkecepatan tinggi.",
        imageUrl:
          "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?q=80&w=1760&auto=format&fit=crop",
        year: "2023",
        category: "Automotive",
        role: "Director of Photography",
        camera: "ARRI Alexa 35 & Pursuit Systems Chase Car",
        matchScore: 95,
        videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0",
      },
      {
        id: "comm-5",
        title: "Summer Splash",
        description:
          "Iklan minuman musim panas yang menyegarkan. Menampilkan macro high-speed phantom shot untuk tetesan air, es, dan kesegaran buah segar.",
        imageUrl:
          "https://images.unsplash.com/photo-1559136555-e46718d0426b?q=80&w=1769&auto=format&fit=crop",
        year: "2024",
        category: "F&B Commercial",
        role: "Cinematographer & Tabletop Specialist",
        camera: "Phantom Flex 4K (1000 FPS)",
        matchScore: 94,
        videoUrl: "https://www.youtube.com/embed/H7jtC8vjXw8?autoplay=1&rel=0",
      },
    ],
  },
  {
    id: "music-videos",
    title: "Music Videos",
    isLarge: false,
    projects: [
      {
        id: "mv-1",
        title: "Echoes in the Dark",
        description:
          "Official Music Video untuk band indie rock lokal dengan perpaduan moody lighting, haze atmosphere, dan handheld camera movement yang emosional.",
        imageUrl:
          "https://images.unsplash.com/photo-1511899781951-320d7f3ece01?q=80&w=2070&auto=format&fit=crop",
        year: "2025",
        category: "Music Video",
        role: "Director & Cinematographer",
        camera: "Blackmagic URSA 12K",
        matchScore: 99,
        videoUrl: "https://www.youtube.com/embed/04854XqcfCY?autoplay=1&rel=0",
      },
      {
        id: "mv-2",
        title: "Lost Horizon",
        description:
          "Video musik sinematik yang direkam di lanskap dingin vulkanik Islandia, menampilkan panorama epik dan perjalanan spiritual.",
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?q=80&w=2070&auto=format&fit=crop",
        year: "2024",
        category: "Music Video",
        role: "Director of Photography",
        camera: "Sony FX9 & Zeiss Supreme Primes",
        matchScore: 93,
        videoUrl: "https://www.youtube.com/embed/uelHwf8o7_U?autoplay=1&rel=0",
      },
      {
        id: "mv-3",
        title: "Neon Nights",
        description:
          "Visualisasi musik synthwave retro ala era 80an dengan warna magenta-cyan, lensa vintage anamorfi, dan grain film 35mm.",
        imageUrl:
          "https://images.unsplash.com/photo-1516280440502-869279a099a4?q=80&w=1770&auto=format&fit=crop",
        year: "2023",
        category: "Music Video",
        role: "Cinematographer & Colorist",
        camera: "Kodak 35mm 5219 Film & Arriflex 435",
        matchScore: 97,
        videoUrl: "https://www.youtube.com/embed/ktvTqknDobU?autoplay=1&rel=0",
      },
      {
        id: "mv-4",
        title: "Acoustic Soul",
        description:
          "Sesi live recording musik akustik yang sangat intim dengan pencahayaan lilin tungsten alami dan warm tones yang menenangkan.",
        imageUrl:
          "https://images.unsplash.com/photo-1470229722913-7c092bb83df1?q=80&w=1853&auto=format&fit=crop",
        year: "2025",
        category: "Live Session",
        role: "DoP & Gimbal Operator",
        camera: "Sony A7S III & Leica Summicron-C",
        matchScore: 91,
        videoUrl: "https://www.youtube.com/embed/YkgkThdzX-8?autoplay=1&rel=0",
      },
      {
        id: "mv-5",
        title: "Party Anthem",
        description:
          "Video klip energik bertempo cepat untuk trek EDM festival, dipenuhi pergerakan dinamis, stroboscopic lighting, dan crowd shots.",
        imageUrl:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1674&auto=format&fit=crop",
        year: "2026",
        category: "Music Video",
        role: "Director of Photography",
        camera: "RED Komodo 6K",
        matchScore: 92,
        videoUrl: "https://www.youtube.com/embed/ZbZSe6N_BXs?autoplay=1&rel=0",
      },
      {
        id: "mv-6",
        title: "Orchestral Magic",
        description:
          "Dokumentasi multi-kamera untuk konser orkestra simfoni di gedung pertunjukan bersejarah, menonjolkan ekspresi musisi dan arsitektur aula.",
        imageUrl:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1770&auto=format&fit=crop",
        year: "2024",
        category: "Live Event",
        role: "Technical Director & Lead Cam",
        camera: "Canon C500 Mark II Multi-cam Rig",
        matchScore: 94,
        videoUrl: "https://www.youtube.com/embed/iA_wovVBR9Y?autoplay=1&rel=0",
      },
    ],
  },
  {
    id: "weddings",
    title: "Cinematic Weddings",
    isLarge: false,
    projects: [
      {
        id: "wed-1",
        title: "John & Jane",
        description:
          "Dokumentasi pernikahan megah dengan gaya sinematik di tebing Uluwatu Bali, menangkap kehangatan momen ikrar cinta di depan matahari terbenam.",
        imageUrl:
          "https://drive.google.com/thumbnail?id=1zbvYrtPNVvgueyHRCVy4SJTeI-hzX1W5",
        year: "2025",
        category: "Destination Wedding",
        role: "Lead Cinematographer",
        camera: "Sony FX3 & G-Master Lenses",
        matchScore: 98,
        videoUrl: "https://www.youtube.com/embed/QYDyqo9zbvE?autoplay=1&rel=0",
      },
      {
        id: "wed-2",
        title: "A Vow by the Lake",
        description:
          "Pernikahan intim di tepi danau berkabut dengan pencahayaan golden hour alami dan pendekatan storytelling dokumenter yang puitis.",
        imageUrl:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1769&auto=format&fit=crop",
        year: "2024",
        category: "Intimate Wedding",
        role: "DoP & Editor",
        camera: "Sony FX6",
        matchScore: 96,
        videoUrl: "https://www.youtube.com/embed/QYDyqo9zbvE?autoplay=1&rel=0",
      },
      {
        id: "wed-3",
        title: "Urban Romance",
        description:
          "Pre-wedding photoshoot and cinematic visual teaser di tengah hiruk-pikuk lampu malam kota metropolitan dan rooftop gedung pencakar langit.",
        imageUrl:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1770&auto=format&fit=crop",
        year: "2025",
        category: "Pre-Wedding",
        role: "Director & Cinematographer",
        camera: "Blackmagic Pocket 6K Pro",
        matchScore: 95,
        videoUrl: "https://www.youtube.com/embed/QYDyqo9zbvE?autoplay=1&rel=0",
      },
      {
        id: "wed-4",
        title: "The Grand Celebration",
        description:
          "Resepsi pernikahan agung bergaya klasik Eropa dengan tata cahaya chandelier megah, iringan musik orkestra, dan lebih dari 1000 tamu undangan.",
        imageUrl:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1770&auto=format&fit=crop",
        year: "2023",
        category: "Royal Wedding",
        role: "Lead DoP",
        camera: "RED V-Raptor & Master Primes",
        matchScore: 90,
        videoUrl: "https://www.youtube.com/embed/Qp3jGBfEhFU?autoplay=1&rel=0",
      },
    ],
  },
  {
    id: "events",
    title: "Events & Gatherings",
    isLarge: false,
    projects: [
      {
        id: "eve-1",
        title: "Tech Conference 2025",
        description:
          "Dokumentasi acara konferensi inovasi teknologi tahunan terbesar dengan lebih dari 5000 peserta, keynote stage berlayar LED masif, dan breakout sessions.",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1770&auto=format&fit=crop",
        year: "2025",
        category: "Corporate Event",
        role: "Show Director & Lead Cam",
        camera: "Sony FX6 & Broadcast PTZ Rig",
        matchScore: 93,
        videoUrl: "https://www.youtube.com/embed/2vjPBrBU-TM?autoplay=1&rel=0",
      },
      {
        id: "eve-2",
        title: "Summer Music Fest",
        description:
          "Official cinematic aftermovie festival musik musim panas 3 hari berturut-turut yang meriah dengan pyrotechnics dan drone light show.",
        imageUrl:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1770&auto=format&fit=crop",
        year: "2024",
        category: "Festival Aftermovie",
        role: "DoP & Drone Pilot",
        camera: "RED Komodo & DJI Inspire 3",
        matchScore: 97,
        videoUrl: "https://www.youtube.com/embed/FTQbiNvZqaY?autoplay=1&rel=0",
      },
      {
        id: "eve-3",
        title: "Gala Dinner",
        description:
          "Malam penghargaan eksklusif dan gala dinner tahunan perusahaan multinasional, memancarkan kesan prestisius dan mewah.",
        imageUrl:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1769&auto=format&fit=crop",
        year: "2025",
        category: "Gala Dinner",
        role: "Lead Cinematographer",
        camera: "Sony FX3 Rig",
        matchScore: 89,
        videoUrl: "https://www.youtube.com/embed/YcopV1_pVFk?autoplay=1&rel=0",
      },
      {
        id: "eve-4",
        title: "Brand Activation",
        description:
          "Highlight aktivasi merek dan peluncuran instalasi interaktif di atrium pusat perbelanjaan ternama dengan interaksi audiens yang tinggi.",
        imageUrl:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1770&auto=format&fit=crop",
        year: "2026",
        category: "Brand Event",
        role: "Videographer & Editor",
        camera: "Sony FX6",
        matchScore: 94,
        videoUrl: "https://www.youtube.com/embed/BI23U7U2aUY?autoplay=1&rel=0",
      },
      {
        id: "eve-5",
        title: "Charity Run Marathon",
        description:
          "Dokumentasi acara lari maraton amal pagi hari untuk penggalangan dana sosial, menampilkan ribuan pelari dengan energi dan semangat sportivitas.",
        imageUrl:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
        year: "2023",
        category: "Sports Event",
        role: "DoP & Gimbal Chase Operator",
        camera: "Sony FX3 & Segway Rig",
        matchScore: 92,
        videoUrl: "https://www.youtube.com/embed/HOBjpKl9M2k?autoplay=1&rel=0",
      },
    ],
  },
  {
    id: "photography",
    title: "Cinematic & Editorial Photography",
    isLarge: false,
    projects: [
      {
        id: "photo-1",
        title: "Shadows & Silhouettes",
        description:
          "Editorial fashion series yang mengeksplorasi chiaroscuro lighting, kontras bayangan tajam, dan tekstur kain monokromatik di galeri seni modern.",
        imageUrl:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
        year: "2025",
        category: "Editorial Fashion",
        role: "Lead Photographer & Retoucher",
        camera: "Leica M11 & Summilux-M 50mm f/1.4 ASPH",
        matchScore: 99,
        mediaType: "photo",
      },
      {
        id: "photo-2",
        title: "Neon Metropolis",
        description:
          "Koleksi fotografi jalanan malam hari yang menangkap pantulan hujan, lampu neon cyberpunk, dan kehidupan tersembunyi kota metropolitan.",
        imageUrl:
          "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1964&auto=format&fit=crop",
        year: "2026",
        category: "Street & Urban",
        role: "Photographer & Colorist",
        camera: "Hasselblad X2D 100C & XCD 38mm f/2.5 V",
        matchScore: 97,
        mediaType: "photo",
      },
      {
        id: "photo-3",
        title: "Highland Mist",
        description:
          "Seri fotografi lanskap fine-art berskala besar di dataran tinggi berkabut Bromo dan Ijen saat fajar, menghasilkan kedalaman warna 16-bit yang megah.",
        imageUrl:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
        year: "2024",
        category: "Fine Art Landscape",
        role: "Landscape Photographer",
        camera: "Fujifilm GFX 100 II & GF 45-100mm f/4",
        matchScore: 96,
        mediaType: "photo",
      },
      {
        id: "photo-4",
        title: "Film Stills: The Director's Cut",
        description:
          "Kompilasi dokumentasi still-photography eksklusif di balik layar produksi film layar lebar, menangkap konsentrasi sutradara dan chemistry para aktor.",
        imageUrl:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
        year: "2025",
        category: "Set & Unit Stills",
        role: "Unit Still Photographer",
        camera: "Leica SL2-S & APO-Summicron-SL 35mm f/2",
        matchScore: 95,
        mediaType: "photo",
      },
      {
        id: "photo-5",
        title: "Raw Emotions",
        description:
          "Potret studio hitam-putih intim dengan pencahayaan tunggal besar (deep parabolic softbox), menonjolkan karakter wajah dan ketajaman tatapan mata.",
        imageUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        year: "2024",
        category: "Studio Portraiture",
        role: "Portrait Photographer",
        camera: "Hasselblad H6D-100c & HC 100mm f/2.2",
        matchScore: 98,
        mediaType: "photo",
      },
      {
        id: "photo-6",
        title: "Automotive Precision",
        description:
          "Fotografi komersial supercar di trek balap tertutup saat sunset, memadukan motion blur dinamis dan detail serat karbon presisi tinggi.",
        imageUrl:
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
        year: "2025",
        category: "Automotive Commercial",
        role: "Commercial Photographer",
        camera: "Sony A7R V & FE 85mm f/1.4 GM",
        matchScore: 94,
        mediaType: "photo",
      },
    ],
  },
];

