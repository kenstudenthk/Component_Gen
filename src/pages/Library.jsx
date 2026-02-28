import { useState } from 'react';
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { CategoryGrid } from "../components/landing/CategoryGrid";
import { Footer } from "../components/landing/Footer";

export default function Library() {
  const [activeFilter, setActiveFilter] = useState('Categories');

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] font-sans text-white">
      <Header />
      <main className="flex-1">
        <Hero activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <CategoryGrid activeFilter={activeFilter} />
      </main>
      <Footer />
    </div>
  );
}