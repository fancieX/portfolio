/**
 * Domain types for Snapline portfolio projects and case studies.
 */

export type ProjectCategory =
  | "All"
  | "Web app"
  | "Mobile app"
  | "Design system"
  | "Brand";

export type ProjectViewMode = "grid" | "list";

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectMeta {
  client: string;
  role: string;
  type: ProjectCategory;
  year: string;
  duration: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  premise: string;
  client: string;
  role: string;
  type: ProjectCategory;
  year: string;
  duration: string;
  metrics: ProjectMetric[];
  heroImage: string;
  coverImage?: string;
  overview?: string;
  challenge?: string;
  approach?: string;
  testimonial?: ProjectTestimonial;
  nextSlug?: string;
  featured?: boolean;
  order?: number;
}
