export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: string;
  category: string;
  role?: string;
  camera?: string;
  matchScore?: number;
  duration?: string;
  mediaType?: "video" | "photo";
  videoUrl?: string;
}

export interface SectionCategory {
  id: string;
  title: string;
  isLarge?: boolean;
  projects: Project[];
}

export interface PricingPackage {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNote?: string;
  color?: string;
  badge?: string;
  icon?: string;
  features: string[];
  order?: number;
}


