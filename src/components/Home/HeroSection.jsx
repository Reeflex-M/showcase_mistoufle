import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="relative h-screen">
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
            <button className="bg-primary hover:bg-primary-dark hover:text-primary-lightest px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Adoptez un animal
            </button>
            <button className="bg-white text-primary hover:bg-primary-dark hover:text-primary-lightest hover:bg-primary-darkest px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
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
  );
}

export default HeroSection;
