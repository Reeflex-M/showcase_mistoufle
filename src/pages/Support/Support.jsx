import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

function Support() {
  const donationItems = [
    {
      category: "Litière",
      items: [
        {
          src: "/Support/litiere/catsan.png",
          alt: "Litière Catsan",
        },
        {
          src: "/Support/litiere/Litiere_eco.png",
          alt: "Litière Alternative",
        },
      ],
    },
    {
      category: "Croquettes chaton",
      items: [
        {
          src: "/Support/chaton/croquette_purina_chaton.png",
          alt: "Croquettes Purina Chaton",
        },
        {
          src: "/Support/chaton/royal_canin_mother_chaton.png",
          alt: "Croquettes Chaton Alternative",
        },
      ],
    },
    {
      category: "Croquettes chat",
      items: [
        {
          src: "/Support/chat/croquette_ultima.webp",
          alt: "Croquettes Ultima Chat",
        },
        {
          src: "/Support/chat/purina_one_chat.png",
          alt: "Croquettes Chat Alternative",
        },
      ],
    },
    {
      category: "Croquettes Chiots",
      items: [
        {
          src: "/Support/chiot/croquette_puppy.png",
          alt: "Croquettes Puppy",
        },
        {
          src: "/Support/chiot/croquette_medium_chiot.png",
          alt: "Croquettes Chiot Alternative",
        },
      ],
    },
    {
      category: "Croquettes chien",
      items: [
        {
          src: "/Support/chien/royal_canin.png",
          alt: "Croquettes Royal Canin",
        },
        {
          src: "/Support/chien/croquette_pedigree.png",
          alt: "Croquettes Chien Alternative",
        },
      ],
    },
    {
      category: "Patee",
      items: [
        {
          src: "/Support/patee/patte_mousse_babycat.png",
          alt: "Bac à litière",
        },
        {
          src: "/Support/patee/patte_purina.png",
          alt: "Griffoir pour chat",
        },
      ],
    },
    {
      category: "Matériel Animaux",
      items: [
        {
          src: "/Support/materiel/collier_laisse.png",
          alt: "Laisse pour chien",
        },
        {
          src: "/Support/materiel/bac_a_litiere.png",
          alt: "Bac à litière",
        },
      ],
    },
    {
      category: "Matériel de ménage",
      items: [
        {
          src: "/Support/materiel/eponge_verte.png",
          alt: "Eponge verte",
        },
        {
          src: "/Support/materiel/eponge_rouge.png",
          alt: "Eponge rouge",
        },
        {
          src: "/Support/materiel/liquide_vaisselle.png",
          alt: "Liquide vaisselle",
        },
        {
          src: "/Support/materiel/sac_congelation.png",
          alt: "Sac congelation",
        },
        {
          src: "/Support/materiel/sac_poubelle.png",
          alt: "Sacs poubelle",
        },
        {
          src: "/Support/materiel/sopalin.png",
          alt: "Sopalin",
        },
      ],
    },
  ];

  const [showArrow, setShowArrow] = useState(true);
  const [showTasks, setShowTasks] = useState(false);

  const tasks = [
    "Événement de collecte",
    "Empaquetage cadeau",
    "Devenir famille d'accueille",
    "Aide au nettoyage des chattes",
    "Lavage du linge",
  ];

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
                  className="w-full sm:w-auto bg-primary-dark text-white px-8 py-4 rounded-xl 
                            shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)]
                            transition-all duration-300 font-semibold text-lg"
                >
                  Devenir bénévole
                </motion.button>
              </Link>
              <motion.div className="relative">
                <motion.button
                  onClick={() => setShowTasks(!showTasks)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-secondary text-white px-8 py-4 rounded-xl 
                            shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)]
                            transition-all duration-300 font-semibold text-lg flex items-center gap-2"
                >
                  Les tâches à effectuer
                  <motion.svg
                    animate={{ rotate: showTasks ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: showTasks ? 1 : 0,
                    y: showTasks ? 10 : -20,
                    scale: showTasks ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 z-20 mt-2 min-w-[300px] transform ${
                    showTasks ? "block" : "hidden"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                      Tâches
                    </h3>
                    <ul className="space-y-3">
                      {tasks.map((task, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-600 hover:text-primary-dark transition-colors duration-200 group cursor-pointer"
                        >
                          <span className="h-2 w-2 rounded-full bg-secondary group-hover:bg-primary-dark transition-colors" />
                          {task}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2rem] blur-2xl opacity-80" />
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src="/public/Support/chat.jpg"
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
          className="py-24"
        >
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 mb-16"
          >
            <span className="text-secondary font-semibold tracking-wider text-sm uppercase">
              Faire un don
            </span>
            <h2 className="text-4xl font-bold text-gray-900">Nos besoins</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Vos dons nous permettent de prendre soin de nos protégés et de
              leur offrir une meilleure qualité de vie au quotidien.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {donationItems.map((category, index) => (
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
                className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] 
                          hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300
                          flex flex-col min-h-[320px]"
              >
                <h3 className="text-center font-semibold text-gray-800 mb-3 text-base">
                  {category.category}
                </h3>
                <div
                  className={`grid ${
                    category.items.length > 2 ? "grid-cols-2" : "grid-cols-1"
                  } gap-3 flex-grow place-content-center`}
                >
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="aspect-[4/3] relative overflow-hidden rounded-lg bg-white
                               border border-gray-100 hover:border-secondary/30 transition-all duration-300
                               shadow-sm hover:shadow-md group h-[140px]"
                    >
                      <motion.img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
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
              strokeWidth={2}
              d="M19 13l-7 7-7-7"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
}

export default Support;
