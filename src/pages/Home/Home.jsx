import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Contenu superposé */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-heading mb-6 leading-tight"
            >
              Donnons-leur une seconde chance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Chaque année, nous sauvons des centaines d'animaux et leur offrons
              une nouvelle vie
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <button className="bg-primary hover:bg-primary-light px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Adoptez un animal
              </button>
              <button className="bg-white text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Faire un don
              </button>
            </motion.div>
          </div>
        </div>

        {/* Flèche de défilement */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Contenu qui glisse par-dessus */}
      <div className="relative">
        {/* Section Événements */}
        <section className="relative bg-white min-h-screen">
          <div className="container mx-auto px-4 py-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-heading text-center mb-12"
            >
              Événements à venir
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Carte d'événement 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src="/event1.jpg"
                  alt="Journée adoption"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Journée d'adoption
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Venez rencontrer nos adorables animaux en quête d'un foyer
                    aimant.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>15 Mai 2024 | 10h-18h</span>
                  </div>
                </div>
              </motion.div>

              {/* Carte d'événement 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src="/event2.jpg"
                  alt="Collecte"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Grande collecte
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Collecte de nourriture et de matériel pour nos protégés.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>20 Mai 2024 | 9h-17h</span>
                  </div>
                </div>
              </motion.div>

              {/* Carte d'événement 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src="/event3.jpg"
                  alt="Portes ouvertes"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Portes ouvertes
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez notre refuge et nos actions pour la protection
                    animale.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>1 Juin 2024 | 14h-19h</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Autres sections */}
        {/* Reste du contenu */}
      </div>
    </>
  );
}

export default Home;
