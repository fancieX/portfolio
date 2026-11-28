import { Header, Footer } from "@/components/navigation";
import { HeroSection, ProcessSection } from "@/components/home";

export default function Home() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1776px] flex-col px-4 pt-6 pb-8 sm:px-8 sm:pb-12 lg:px-14 xl:px-[72px]">
      {/* Top Header Navigation (Task 4.1) */}
      <Header />

      {/* Hero Section with Composite Headline & Role Rotator (Task 5.1–5.4) */}
      <HeroSection />

      {/* 4-Step Prototype-Wired Process Section (Task 5.5) */}
      <ProcessSection />

      {/* Global Page Footer Component (Task 4.4) */}
      <Footer />
    </main>
  );
}
