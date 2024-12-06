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
    const handleScroll = () => {
      const donationSection = document.getElementById("donation-section");
      if (donationSection) {
        const rect = donationSection.getBoundingClientRect();
        setShowArrow(rect.top > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-primary/5 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-sans text-primary-dark mb-8 font-bold">
            Soutenez les Mistoufles
          </h1>
          <div className="h-2 w-32 bg-primary/80 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col gap-32">
          {/* Section Bénévolat */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-20 transition-all duration-500"
          >
            <div className="md:w-1/2 space-y-8 p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Devenez bénévole ou famille d'accueil
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Rendez-vous sur notre page contact pour devenir bénévole et/ou
                famille d'accueil pour le refuge des Mistoufles.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#primary" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-secondary hover:bg-primary text-white px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  Rejoignez-nous
                </motion.button>
              </Link>
            </div>
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="md:w-1/2 overflow-hidden rounded-3xl shadow-2xl"
            >
              <img
                src="/public/Support/benevole.jpg"
                alt="Bénévole avec un chat"
                className="rounded-3xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </motion.section>

          {/* Section Don */}
          <motion.section
            id="donation-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row-reverse items-start gap-20"
          >
            <div className="md:w-1/2 space-y-8 p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Faites un don
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Chaque don compte et permet d'améliorer le quotidien de nos
                protégés. Pour un don monétaire, vous pouvez donner directement
                auprès de l'Association les Mistoufles par chèque.
              </p>
              <motion.div className="bg-white/80 backdrop-blur p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-8">
                  Dons matériels acceptés
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                  {donationItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center"
                    >
                      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-32 object-contain"
                        />
                        <p className="text-center text-base text-gray-700 mt-3 font-medium">
                          {item.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
              >
                Faire un don
              </motion.button>
            </div>
            <motion.div whileHover={{ rotate: -1 }} className="md:w-1/2">
              <img
                src="/public/Support/don_animaux.png"
                alt="Don pour les animaux"
                className="rounded-3xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </motion.section>
        </div>

        {showArrow && (
          <motion.div
            onClick={scrollToBottom}
            className="fixed left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-gray-400 text-sm mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
              Donations
            </span>
            <motion.svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ y: 0 }}
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 13l-7 7-7-7"
              />
            </motion.svg>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Support;
