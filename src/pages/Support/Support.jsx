import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

function Support() {
  const donationItems = [
    { src: "/Support/catsan.png", alt: "Litière Catsan", name: "Litière" },
    {
      src: "/Support/croquette_purina_chaton.png",
      alt: "Croquettes",
      name: "Croquettes chaton",
    },
    {
      src: "/Support/croquette_ultima.webp",
      alt: "Croquettes chat",
      name: "Croquettes chat",
    },
    {
      src: "/Support/croquette_puppy.png",
      alt: "Croquettes Chiots",
      name: "Croquettes Chiots",
    },
    {
      src: "/Support/royal_canin.png",
      alt: "Croquettes chien",
      name: "Croquettes chien",
    },
  ];

  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      const donationSection = document.getElementById("donation-section");
      if (!donationSection) {
        setShowArrow(true);
        return;
      }

      const rect = donationSection.getBoundingClientRect();
      const threshold = window.innerHeight * 0.8; // 80% de la hauteur de l'écran

      // Afficher la flèche si la section donation n'est pas encore visible
      setShowArrow(rect.top > threshold);
    };

    // Vérification initiale
    checkScroll();

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", checkScroll);

    // Nettoyage
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToBottom = () => {
    const donationSection = document.getElementById("donation-section");
    if (donationSection) {
      donationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative pt-28 pb-8 flex flex-col items-center justify-center"
        >
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-dark/90 via-secondary to-primary-dark/90 mb-4 tracking-tight text-center"
          >
            Soutenez les Mistoufles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-700 text-lg mb-4 max-w-2xl text-center font-normal"
          >
            Ensemble, donnons une seconde chance à nos amis à quatre pattes
          </motion.p>
        </motion.div>

        {/* Section Bénévolat */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12 py-4"
        >
          <motion.div variants={itemVariants} className="md:w-1/2 space-y-6">
            <div className="space-y-4">
              <span className="text-secondary font-semibold tracking-wider text-sm uppercase">
                Devenez Bénévole
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Rejoignez notre communauté <br />
                <span className="text-primary-dark">
                  de bénévoles passionnés
                </span>
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Votre temps et votre engagement sont précieux. En devenant
                bénévole ou famille d'accueil, vous contribuez directement au
                bien-être de nos protégés.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-primary-dark hover:bg-primary/90 text-white px-8 py-4 rounded-xl 
                            shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)]
                            transition-all duration-300 font-semibold text-lg"
                >
                  Devenir bénévole
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary-dark px-8 py-4 rounded-xl 
                            shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.25)]
                            transition-all duration-300 font-semibold text-lg border-2 border-primary/10"
                >
                  Famille d'accueil
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2rem] blur-2xl opacity-80" />
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src="/public/Support/benevole.jpg"
                alt="Bénévole avec un chat"
                className="relative rounded-2xl w-full h-[350px] object-cover shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Section Dons */}
        <motion.section
          id="donation-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-32"
        >
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 mb-16"
          >
            <span className="text-secondary font-semibold tracking-wider text-sm uppercase">
              Faire un don
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Nos besoins en dons
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Vos dons nous permettent de prendre soin de nos protégés et de
              leur offrir une meilleure qualité de vie au quotidien.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {donationItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.12)] 
                          hover:shadow-[0_4px_25px_rgba(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-4 bg-gray-100">
                  <motion.img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-800">
                  {item.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {showArrow && (
        <motion.button
          onClick={scrollToBottom}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
            opacity: { duration: 0.2 },
          }}
          className="fixed left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 
                    transition-all duration-300 group cursor-pointer z-50"
        >
          <span className="text-gray-400 text-sm group-hover:text-gray-600 transition-colors">
            donation
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 13l-7 7-7-7"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
}

export default Support;
