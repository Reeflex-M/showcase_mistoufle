import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

function Support() {
  const donationItems = [
    { src: "/Support/catsan.png", alt: "Litière Catsan", name: "Litière" },
    { src: "/Support/croquette_purina_chaton.png", alt: "Croquettes", name: "Croquettes chaton" },
    { src: "/Support/croquette_ultima.webp", alt: "croquettes chat", name: "Croquettes chat" },
    { src: "/Support/croquette_puppy.png", alt: "Croquettes Chiots", name: "Croquettes Chiots" },
    { src: "/Support/royal_canin.png", alt: "Croquettes chien", name: "Croquettes chien" },
  ];

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 800,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-['Pacifico'] text-primary-dark mb-4">
            Soutenez les Mistoufles
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="flex flex-col gap-24">
          {/* Section Bénévolat */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-12 transition-all duration-500"
          >
            <div className="md:w-1/2 space-y-6 p-4">
              <h2 className="text-4xl font-heading text-secondary">
                Devenez bénévole ou famille d&apos;accueil
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Rendez-vous sur notre page contact pour devenir bénévole et/ou famille d&apos;accueil pour le refuge des Mistoufles.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary hover:bg-primary text-white px-10 py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Rejoignez-nous
                </motion.button>
              </Link>
            </div>
            <motion.div
              whileHover={{ rotate: 1 }}
              className="md:w-1/2"
            >
              <img
                src="/public/Support/benevole.jpg"
                alt="Bénévole avec un chat"
                className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </motion.section>

          {/* Section Don */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row-reverse items-start gap-12"
          >
            <div className="md:w-1/2 space-y-8 p-4">
              <h2 className="text-4xl font-heading text-secondary">
                Faites un don
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Chaque don compte et permet d&apos;améliorer le quotidien de nos protégés. Pour un don monétaire, vous pouvez donner directement auprès de l&apos;Association les Mistoufles par chèque.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-heading text-secondary mb-6">
                  Dons matériels acceptés
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {donationItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition-all duration-300 w-full transform hover:scale-105">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-28 object-contain"
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
                className="bg-primary hover:bg-secondary text-white px-10 py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
              >
                Faire un don
              </motion.button>
            </div>
            <motion.div
              whileHover={{ rotate: -1 }}
              className="md:w-1/2"
            >
              <img
                src="/public/Support/don_animaux.png"
                alt="Don pour les animaux"
                className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </motion.section>
        </div>

        {/* Remplacer l'ancien bouton de défilement par celui-ci */}
        <motion.button
          onClick={scrollToBottom}
          className="fixed bottom-8 right-8 bg-primary hover:bg-secondary text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

export default Support;
