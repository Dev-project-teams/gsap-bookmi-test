
"use client"
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import ServiceSection from "./Components/NextSection";


export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* <Header /> */}
      <HeroSection />
      <ServiceSection />
    </main>
  );
}