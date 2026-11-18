import type { DockItem, SitemapSection } from "@/types";

/**
 * Universal bottom floating dock navigation triggers.
 * 5 core routes matching the reference topology:
 * 1. Cursor Arrow (V) -> Home (/)
 * 2. Frame Hash (#)   -> Work (/work)
 * 3. User Profile      -> About (/about)
 * 4. Text Type (T)     -> Journal (/journal)
 * 5. Comment Bubble (C)-> Contact (/contact)
 */
export const dockItems: DockItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: "cursor",
    shortcut: "V",
  },
  {
    id: "work",
    label: "Work",
    href: "/work",
    icon: "frame",
    shortcut: "#",
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    icon: "user",
  },
  {
    id: "journal",
    label: "Journal",
    href: "/journal",
    icon: "text",
    shortcut: "T",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: "comment",
    shortcut: "C",
  },
];

/**
 * Top header branding and primary call-to-action configuration.
 */
export const headerNav = {
  brand: {
    label: "Maya.",
    href: "/",
  },
  cta: {
    label: "Get in touch",
    href: "/contact",
  },
};

/**
 * Global footer sitemap links grouped into Pages, Info, and Social.
 */
export const footerSitemap: SitemapSection[] = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "404", href: "/404" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/", isExternal: true },
      { label: "Dribbble", href: "https://dribbble.com/", isExternal: true },
      { label: "Instagram", href: "https://instagram.com/", isExternal: true },
      { label: "X", href: "https://x.com/", isExternal: true },
    ],
  },
];

/**
 * Retrieve dock item by route pathname.
 */
export function getDockItemByHref(href: string): DockItem | undefined {
  return dockItems.find((item) => item.href === href);
}

/**
 * Retrieve sitemap section by title.
 */
export function getSitemapSection(title: string): SitemapSection | undefined {
  return footerSitemap.find(
    (section) => section.title.toLowerCase() === title.toLowerCase()
  );
}
