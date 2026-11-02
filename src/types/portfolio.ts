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

