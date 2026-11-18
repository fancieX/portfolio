/**
 * Domain types for Snapline portfolio About page, experience timeline, tool stack, and FAQs.
 */

export interface StatMetric {
  value: string;
  label: string;
  description?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description?: string;
}

export interface ToolItem {
  name: string;
  category: string;
  description?: string;
  icon?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface AboutProfile {
  name: string;
  role: string;
  location: string;
  bio: string[];
  resumeUrl?: string;
  stats: StatMetric[];
  experience: ExperienceItem[];
  tools: ToolItem[];
  faqs: FaqItem[];
}
