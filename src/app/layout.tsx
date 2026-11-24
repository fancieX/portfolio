import type { Metadata, Viewport } from "next";
import { geist, inter } from "@/styles/fonts";
import { DotGridBackground, CanvasProvider } from "@/components/canvas";
import { FloatingDock } from "@/components/navigation";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E6E6E3",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://snapline.framer.website"),
  title: {
    default: "Maya Ortiz | Product Designer in Lisbon",
    template: "%s | Maya Ortiz",
  },
  description:
    "Product Designer in Lisbon crafting thoughtful digital interfaces, design systems, and web apps.",
  keywords: [
    "Product Designer",
    "Lisbon",
    "Maya Ortiz",
    "Design Systems",
    "UI/UX Design",
    "Digital Interfaces",
    "Web Apps",
  ],
  authors: [{ name: "Maya Ortiz" }],
  creator: "Maya Ortiz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snapline.framer.website/",
    siteName: "Maya Ortiz",
    title: "Maya Ortiz | Product Designer in Lisbon",
    description:
      "Product Designer in Lisbon crafting thoughtful digital interfaces, design systems, and web apps.",
    images: [
      {
        url: "/images/hero-portrait.webp",
        width: 1200,
        height: 1800,
        alt: "Maya Ortiz — Product Designer in Lisbon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maya Ortiz | Product Designer in Lisbon",
    description:
      "Product Designer in Lisbon crafting thoughtful digital interfaces, design systems, and web apps.",
    images: ["/images/hero-portrait.webp"],
  },
  icons: {
    icon: "/icons/cursor.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="relative min-h-screen font-sans text-text-primary antialiased">
        <DotGridBackground />
        <CanvasProvider>
          <div id="canvas-root" className="relative min-h-screen w-full overflow-x-hidden">
            {children}
          </div>
          <FloatingDock />
        </CanvasProvider>
      </body>
    </html>
  );
}
