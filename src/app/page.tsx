import { Header, Footer } from "@/components/navigation";
import { HeroSection } from "@/components/home";

export default function Home() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1776px] flex-col px-4 pt-6 pb-8 sm:px-8 sm:pb-12 lg:px-14 xl:px-[72px]">
      {/* Top Header Navigation (CTA removed on homepage top-right) */}
      <Header showCta={false} />

      {/* Hero Section with Composite Headline & Role Rotator (Task 5.1) */}
      <HeroSection />

      {/* Global Page Footer Component (Task 4.4) */}
      <Footer />
    </main>
  );
}
