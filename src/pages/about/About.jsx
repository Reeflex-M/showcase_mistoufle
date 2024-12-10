import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaCat, FaDog } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "D'où viennent les animaux des Mistoufles ?",
    answer: (
      <div className="space-y-6">
        <div className="bg-primary-light p-4 rounded-lg">
          <p className="font-medium text-primary-dark">
            L'association accueille principalement les animaux sortants de
            fourrière des territoires suivants :
          </p>
          <ul className="mt-3 space-y-2 ml-4">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>
                Morlaix Communauté{" "}
                <span className="text-primary-dark/60">
                  (via la fourrière SACPA Chenil service de Plérin)
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>
                Communauté de Communes du Pays Léonard{" "}
                <span className="text-primary-dark/60">
                  (via la fourrière de Taulé, Chenil St Roch)
                </span>
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>
                Côtes d'Armor, Morbihan et Ille-et-Vilaine{" "}
                <span className="text-primary-dark/60">
                  (selon disponibilités)
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-primary-light p-4 rounded-lg">
          <p className="font-medium text-primary-dark mb-3">
            Autres prises en charge :
          </p>
          <p className="text-primary-dark/70 leading-relaxed">
            L'association accueille également des animaux par des prises en
            charge directes pour divers motifs :
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            <li className="text-primary-dark/70">• Hospitalisation</li>
            <li className="text-primary-dark/70">
              • Départ en maison de retraite
            </li>
            <li className="text-primary-dark/70">• Abandon</li>
            <li className="text-primary-dark/70">• Imprévus de la vie</li>
          </ul>
          <p className="mt-4 text-primary-dark/70 leading-relaxed">
            Un travail est assuré avec les services sociaux et d'autres
            structures en ce sens.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    question: "Notre objectif : trouver des solutions pour nos protégés",
    answer: (
      <div className="space-y-6">
        <div className="bg-primary-light p-4 rounded-lg border-l-4 border-primary">
          <div className="flex items-center space-x-3 mb-2">
            <FaCat className="text-2xl text-primary-dark" />
            <h4 className="font-medium text-primary-dark">Notre chatterie</h4>
          </div>
          <p className="text-primary-dark/70 leading-relaxed">
            L'association possède une chatterie permettant d'accueillir{" "}
            <span className="font-semibold text-primary-dark">33 chats</span>{" "}
            qui y vivent en totale liberté.
          </p>
        </div>

        <div className="bg-primary-light p-4 rounded-lg border-l-4 border-primary">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex -space-x-2">
              <FaDog className="text-2xl text-primary-dark" />
              <FaCat className="text-2xl text-primary-dark" />
            </div>
            <h4 className="font-medium text-primary-dark">
              Nos familles d'accueil
            </h4>
          </div>
          <p className="text-primary-dark/70 leading-relaxed">
            Pour ce qui est de nos chiens, chatons et certains chats,
            l'association fonctionne avec une{" "}
            <span className="font-semibold text-primary-dark">
              cinquantaine de familles d'accueil
            </span>{" "}
            quotidiennement.
          </p>
          <div className="mt-3 pl-3 border-l-2 border-primary/30">
            <p className="text-primary-dark/70 italic">
              Cela permet aux animaux d'avoir un temps nécessaire pour des
              soins, de la sociabilisation et/ou une réadaptation à une vie de
              famille afin de leur redonner une nouvelle chance qu'ils méritent
              !
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    question:
      "Des personnes actives et passionnées qui s'engagent pour l'association",
    answer: (
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-6 p-6 bg-primary-light rounded-lg">
          <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
            <p className="text-4xl font-bold text-primary-dark mb-1">1</p>
            <p className="text-sm text-primary-dark/70">Salariée</p>
          </div>
          <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
            <p className="text-4xl font-bold text-primary-dark mb-1">15</p>
            <p className="text-sm text-primary-dark/70">Bénévoles actifs</p>
          </div>
        </div>

        <div className="bg-primary-light p-5 rounded-lg">
          <h4 className="text-lg font-medium text-primary-dark mb-4">
            Comment fonctionne l'association ?
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 bg-primary rounded-full"></div>
              <p className="text-primary-dark/70">Frais d'adoption</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 bg-primary rounded-full"></div>
              <p className="text-primary-dark/70">
                Dons financiers et/ou matériels
                <span className="text-primary-dark/50 text-sm italic block ml-2">
                  (croquettes, litières, laisses...)
                </span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 bg-primary rounded-full"></div>
              <p className="text-primary-dark/70">
                Subventions des communes avoisinantes
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 bg-primary rounded-full"></div>
              <p className="text-primary-dark/70">
                Aide de 30 millions d'amis
                <span className="text-primary-dark/50 text-sm italic block ml-2">
                  (nourriture et frais vétérinaires)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-primary/20">
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold text-primary-dark">{question}</h3>
        <span
          className={`text-2xl transform transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <div className="overflow-hidden">
            <p className="pb-6 text-primary-dark/70 leading-relaxed">
              {answer}
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Counter({ from = 0, to, duration = 2, className }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.round(from + (to - from) * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(to);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}

function About() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <div className="py-8 px-4 flex justify-center">
        <h1 className="text-4xl font-bold text-primary-dark border-b-2 border-primary pb-2">
          Les Mistoufles
        </h1>
      </div>

      {/* Questions Section */}
      <div className="max-w-3xl mx-auto px-4 mb-20">
        <div className="space-y-4">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200"
            >
              <button
                onClick={() => setOpenId(openId === q.id ? null : q.id)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-gray-900">
                  {q.question}
                </span>
                <motion.span
                  animate={{ rotate: openId === q.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-500"
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openId === q.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <div className="prose max-w-none">{q.answer}</div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <Counter from={0} to={33} className="text-4xl font-bold" />
              <p className="mt-2 text-primary-light">Chats en chatterie</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-6 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <Counter from={0} to={50} className="text-4xl font-bold" />
              <p className="mt-2 text-primary-light">Familles d'accueil</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-6 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <Counter from={0} to={100} className="text-4xl font-bold" />
              <p className="mt-2 text-primary-light">Animaux sauvés par an</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
