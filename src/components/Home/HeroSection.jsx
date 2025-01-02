import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background avec effet parallaxe */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-top bg-no-repeat" />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />

      {/* Contenu principal */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
            }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="mb-8">
              <span className="block text-4xl md:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
                Donnons-leur
              </span>
              <span className="block text-5xl md:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-white to-primary-light animate-gradient">
                Une Seconde Chance
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light"
          >
            Chaque année, nous sauvons des centaines d&apos;animaux et leur
            offrons une nouvelle vie
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/adoptions"
              className="group relative px-8 py-4 w-64 overflow-hidden rounded-xl bg-primary-dark text-white shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-0 bg-primary-darkest transition-all duration-[250ms] ease-out group-hover:w-full" />
              <span className="relative text-lg font-semibold group-hover:text-white">
                Adoptez un animal
              </span>
            </Link>
            <Link
              to="/donations"
              className="group relative px-8 py-4 w-64 overflow-hidden rounded-xl bg-transparent border-2 border-white text-white shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full" />
              <span className="relative text-lg font-semibold group-hover:text-primary-darkest">
                Faire un don
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Flèche de défilement améliorée */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/80 text-sm font-light">Nos événements </span>
          <svg
            className="w-6 h-6 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
