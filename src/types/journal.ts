/**
 * Domain types for Snapline portfolio journal articles and essays.
 */

export type ArticleCategory =
  | "Design"
  | "Process"
  | "Branding"
  | "Engineering"
  | "Systems";

export interface JournalArticle {
  slug: string;
  title: string;
  category: ArticleCategory;
  date: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  content: string;
  author?: string;
  featured?: boolean;
  order?: number;
}
