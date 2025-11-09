
"use client"
import HeroSection from "./Components/HeroSection";
import ServiceSection from "./Components/NextSection";


export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <ServiceSection />
    </main>
  );
}