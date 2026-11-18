import type { Metadata } from "next";
import { geist, inter } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Snapline Portfolio",
  description: "Recreation of Snapline Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
