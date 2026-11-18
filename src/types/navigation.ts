/**
 * Domain types for Snapline portfolio navigation, dock triggers, and sitemap configuration.
 */

export type DockTriggerIcon =
  | "cursor"
  | "frame"
  | "user"
  | "text"
  | "comment";

export interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: DockTriggerIcon;
  shortcut?: string;
}

export interface SitemapLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SitemapSection {
  title: string;
  links: SitemapLink[];
}

export interface SiteConfig {
  name: string;
  title: string;
  role: string;
  location: string;
  timezone: string;
  availability: string;
  email: string;
  url: string;
}
