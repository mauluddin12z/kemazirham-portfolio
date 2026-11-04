import { Project, SectionCategory, PricingPackage } from "@/types/portfolio";

export interface StrapiProjectDocument {
  id?: string | number;
  documentId?: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  year?: string;
  category: string;
  sectionId?: "commercials" | "music-videos" | "weddings" | "events" | "photography";
  role?: string;
  camera?: string;
  matchScore?: number;
  duration?: string;
  mediaType?: "video" | "photo";
  isHero?: boolean;
  order?: number;
}

const STRAPI_BASE_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:5002";

const SECTION_TEMPLATES = [
  { id: "commercials", title: "Top Commercials", isLarge: true },
  { id: "music-videos", title: "Music Videos", isLarge: false },
  { id: "weddings", title: "Cinematic Weddings", isLarge: false },
  { id: "events", title: "Events & Gatherings", isLarge: false },
  { id: "photography", title: "Cinematic & Editorial Photography", isLarge: false },
];

/**
 * Mengambil seluruh data portfolio langsung dari Strapi CMS
 */
export async function fetchPortfolioFromStrapi(): Promise<{
  heroProject: Project | null;
  sections: SectionCategory[];
}> {
  try {
    const url = `${STRAPI_BASE_URL}/api/projects?sort=order:asc&pagination[pageSize]=100`;
    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) {
      console.warn(`[Strapi API] Gagal mengambil data: HTTP ${res.status}`);
      return { heroProject: null, sections: [] };
    }

    const json = await res.json();
    const items: StrapiProjectDocument[] = json.data || [];

    if (!items || items.length === 0) {
      return { heroProject: null, sections: [] };
    }

    // 1. Ekstrak Hero Showreel Project
    const heroItem = items.find((p) => p.isHero);
    const heroProject: Project | null = heroItem
      ? {
          id: heroItem.documentId || String(heroItem.id || "hero"),
          title: heroItem.title,
          description: heroItem.description,
          imageUrl: heroItem.imageUrl,
          videoUrl: heroItem.videoUrl,
          year: heroItem.year || "2026",
          category: heroItem.category || "Showreel",
          role: heroItem.role,
          camera: heroItem.camera,
          matchScore: heroItem.matchScore,
          duration: heroItem.duration,
          mediaType: heroItem.mediaType || "video",
        }
      : null;

    // 2. Petakan ke Section Categories berdasarkan sectionId
    const sections: SectionCategory[] = SECTION_TEMPLATES.map((tmpl) => {
      const sectionProjects: Project[] = items
        .filter((item) => !item.isHero && item.sectionId === tmpl.id)
        .map((item) => ({
          id: item.documentId || String(item.id || item.title),
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          videoUrl: item.videoUrl,
          year: item.year || "2025",
          category: item.category,
          role: item.role,
          camera: item.camera,
          matchScore: item.matchScore ?? 98,
          duration: item.duration,
          mediaType: item.mediaType || (tmpl.id === "photography" ? "photo" : "video"),
        }));

      return {
        id: tmpl.id,
        title: tmpl.title,
        isLarge: tmpl.isLarge,
        projects: sectionProjects,
      };
    }).filter((s) => s.projects.length > 0);

    return { heroProject, sections };
  } catch (error) {
    console.error("[Strapi] Error connecting to Strapi CMS:", error);
    return { heroProject: null, sections: [] };
  }
}

export interface StrapiPackageDocument {
  id?: string | number;
  documentId?: string;
  name: string;
  category: string;
  price: string;
  priceNote?: string;
  color?: string;
  badge?: string;
  icon?: string;
  features: string | string[];
  order?: number;
}

/**
 * Mengambil seluruh data paket harga layanan dari Strapi CMS
 */
export async function fetchPackagesFromStrapi(): Promise<PricingPackage[]> {
  try {
    const url = `${STRAPI_BASE_URL}/api/packages?sort=order:asc&pagination[pageSize]=100`;
    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) {
      console.warn(`[Strapi API] Gagal mengambil data paket: HTTP ${res.status}`);
      return [];
    }

    const json = await res.json();
    const items: StrapiPackageDocument[] = json.data || [];

    return items.map((item) => {
      let parsedFeatures: string[] = [];
      if (Array.isArray(item.features)) {
        parsedFeatures = item.features.map((f) => String(f).trim()).filter(Boolean);
      } else if (typeof item.features === "string") {
        parsedFeatures = item.features
          .split("\n")
          .map((f) => f.trim().replace(/^[-*•]\s*/, ""))
          .filter(Boolean);
      }

      return {
        id: item.documentId || String(item.id || item.name),
        name: item.name,
        category: item.category,
        price: item.price,
        priceNote: item.priceNote || "",
        color: item.color || "",
        badge: item.badge || undefined,
        icon: item.icon || undefined,
        features: parsedFeatures,
        order: item.order ?? 0,
      };
    });
  } catch (error) {
    console.error("[Strapi] Error connecting to Strapi CMS for packages:", error);
    return [];
  }
}

