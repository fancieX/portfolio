import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
