import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import HeroSection from "../../components/Home/HeroSection";
import EventsSection from "../../components/Home/EventsSection";

function Home() {
  return (
    <>
      {/* Image de fond fixe */}
      <div className="fixed inset-0">
        <img
          src="/chat.jpg"
          alt="Chat en détresse"
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Contenu principal */}
      <HeroSection />

      {/* Contenu qui glisse par-dessus */}
      <div className="relative">
        <EventsSection />
        {/* Autres sections */}
        {/* Reste du contenu */}
      </div>
    </>
  );
}

export default Home;
