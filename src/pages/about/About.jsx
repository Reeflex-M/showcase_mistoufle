import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaCat, FaDog, FaChevronDown, FaPaw, FaHeart, FaHome, FaHandHoldingHeart } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "D'où viennent les animaux des Mistoufles ?",
    answer: (
      <div className="space-y-6">
        <div className="bg-primary-light p-3 sm:p-4 rounded-lg">
          <p className="font-medium text-primary-darkest text-sm sm:text-base">
            L'association accueille principalement les animaux sortants de
            fourrière des territoires suivants :
          </p>
          <ul className="mt-2 sm:mt-3 space-y-2 ml-2 sm:ml-4">
            <li className="flex items-start sm:items-center space-x-2 text-sm sm:text-base">
              <span className="w-2 h-2 mt-1.5 sm:mt-0 bg-primary rounded-full flex-shrink-0"></span>
              <span>
                Morlaix Communauté{" "}
                <span className="text-primary-dark block sm:inline text-sm sm:text-base">
                  (via la fourrière SACPA Chenil service de Plérin)
                </span>
              </span>
            </li>
            <li className="flex items-start sm:items-center space-x-2 text-sm sm:text-base">
              <span className="w-2 h-2 mt-1.5 sm:mt-0 bg-primary rounded-full flex-shrink-0"></span>
              <span>
                Communauté de Communes du Pays Léonard{" "}
                <span className="text-primary-dark block sm:inline text-sm sm:text-base">
                  (via la fourrière de Taulé, Chenil St Roch)
                </span>
              </span>
            </li>
            <li className="flex items-start sm:items-center space-x-2 text-sm sm:text-base">
              <span className="w-2 h-2 mt-1.5 sm:mt-0 bg-primary rounded-full flex-shrink-0"></span>
              <span>
                Côtes d'Armor, Morbihan et Ille-et-Vilaine{" "}
                <span className="text-primary-dark block sm:inline text-sm sm:text-base">
                  (selon disponibilités)
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-primary-light p-3 sm:p-4 rounded-lg">
          <p className="font-medium text-primary-darkest mb-2 sm:mb-3 text-sm sm:text-base">
            Autres prises en charge :
          </p>
          <p className="leading-relaxed text-sm sm:text-base">
            L'association accueille également des animaux par des prises en
            charge directes pour divers motifs :
          </p>
          <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li className="text-primary-dark text-sm sm:text-base">• Hospitalisation</li>
            <li className="text-primary-dark text-sm sm:text-base">
              • Départ en maison de retraite
            </li>
            <li className="text-primary-dark text-sm sm:text-base">• Abandon</li>
            <li className="text-primary-dark text-sm sm:text-base">• Imprévus de la vie</li>
          </ul>
          <p className="mt-4 leading-relaxed text-sm sm:text-base">
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
        <div className="bg-primary-light p-3 sm:p-4 rounded-lg border-l-4 border-primary">
          <div className="flex items-center space-x-3 mb-2">
            <FaCat className="text-2xl text-primary-dark" />
            <h4 className="font-medium text-primary-darkest text-sm sm:text-base">
              Notre chatterie
            </h4>
          </div>
          <p className="leading-relaxed text-sm sm:text-base">
            L'association possède une chatterie permettant d'accueillir{" "}
            <span className="font-bold text-gray-900">
              33 chats
            </span>{" "}
            qui y vivent en totale liberté.
          </p>
        </div>

        <div className="bg-primary-light p-3 sm:p-4 rounded-lg border-l-4 border-primary">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex -space-x-2">
              <FaDog className="text-2xl text-primary-dark" />
              <FaCat className="text-2xl text-primary-dark" />
            </div>
            <h4 className="font-medium text-primary-darkest text-sm sm:text-base">
              Nos familles d'accueil
            </h4>
          </div>
          <p className="leading-relaxed text-sm sm:text-base">
            Pour ce qui est de nos chiens, chatons et certains chats,
            l'association fonctionne avec une{" "}
            <span className="font-semibold text-primary-dark text-sm sm:text-base">
              cinquantaine de familles d'accueil
            </span>{" "}
            quotidiennement.
          </p>
          <div className="mt-3 pl-3 border-l-2 border-primary/30">
            <p className="text-primary-dark/70 italic text-sm sm:text-base">
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 bg-primary-light rounded-lg">
          <div className="w-full sm:w-auto text-center px-4 py-2 bg-white rounded-lg shadow-sm">
            <p className="text-3xl sm:text-4xl font-bold text-primary-darkest mb-1">1</p>
            <p className="text-sm text-primary-dark">Salariée</p>
          </div>
          <div className="w-full sm:w-auto text-center px-4 py-2 bg-white rounded-lg shadow-sm">
            <p className="text-3xl sm:text-4xl font-bold text-primary-darkest mb-1">+ 100</p>
            <p className="text-sm text-primary-dark">Bénévoles actifs</p>
          </div>
        </div>

        <div className="bg-primary-light p-5 rounded-lg">
          <h4 className="text-lg font-medium text-primary-darkest mb-4 text-sm sm:text-base">
            Comment fonctionne l'association ?
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 bg-primary rounded-full"></div>
              <p className="text-primary-dark text-sm sm:text-base">Frais d'adoption</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 bg-primary rounded-full"></div>
              <p className="text-primary-dark text-sm sm:text-base">
                Dons financiers et/ou matériels
                <span className="text-primary-dark text-sm italic block ml-2">
                  (croquettes, litières, laisses...)
                </span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 bg-primary rounded-full"></div>
              <p className="text-primary-dark text-sm sm:text-base">
                Aide de 30 millions d'amis
                <span className="text-primary-dark text-sm italic block ml-2">
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

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const answerRef = useRef(null);

  useEffect(() => {
    if (isOpen && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isOpen]);

  return (
    <motion.div
      className="border-b border-primary-light/30 last:border-none"
      initial={false}
    >
      <button
        className="w-full py-4 px-2 flex justify-between items-center gap-4 text-left hover:bg-primary-light/10 transition-colors rounded-lg"
        onClick={onClick}
      >
        <h3 className="font-medium text-lg text-primary-darkest">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-primary-dark text-xl" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={answerRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Counter = ({ from = 0, to, duration = 2, className }) => {
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
};

const StatCard = ({ icon: Icon, number, text }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = number / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current > number) {
        current = number;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-center gap-5 bg-white/50 p-5 rounded-xl border border-gray-100 transition-shadow hover:shadow-lg cursor-pointer group w-[260px]"
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary/10 p-2.5 rounded-full"
      >
        <Icon className="text-3xl text-primary" />
      </motion.div>
      <div className="flex flex-col">
        <motion.span 
          className="text-3xl font-bold text-gray-900"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {count}
        </motion.span>
        <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
          {text}
        </span>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [openId, setOpenId] = useState(null);
  const ref = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content Column */}
        <div className="w-full lg:w-3/4 mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12 pt-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Les <span className="text-primary-dark">Mistoufles</span>
            </h1>
            <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              Une association dédiée au bien-être des animaux, œuvrant pour leur donner une seconde chance.
            </p>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <div className="bg-primary-light/20 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaCat className="text-2xl text-primary" />
                <h3 className="font-semibold text-xl">Notre Chatterie</h3>
              </div>
              <p className="text-gray-700">Capacité d'accueil de <span className="font-bold text-gray-900">33 chats</span>, vivant en liberté dans un espace adapté.</p>
            </div>
            <div className="bg-primary-light/20 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaHeart className="text-2xl text-primary" />
                <h3 className="font-semibold text-xl">Familles d'Accueil</h3>
              </div>
              <p className="text-gray-700">Un réseau de familles dévouées pour offrir un foyer temporaire à nos protégés.</p>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-primary-darkest mb-6">Questions Fréquentes</h2>
            <div className="space-y-2">
              {questions.map((q) => (
                <AccordionItem
                  key={q.id}
                  question={q.question}
                  answer={q.answer}
                  isOpen={openId === q.id}
                  onClick={() => setOpenId(openId === q.id ? null : q.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fixed Infographic Column */}
        <div className="w-full lg:w-1/4">
          <div className="lg:fixed lg:right-12 2xl:right-[calc((100vw-80rem)/4)] h-screen flex items-center translate-y-[-15%]">
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StatCard 
                  icon={FaCat}
                  number={33}
                  text="Chats en chatterie"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <StatCard 
                  icon={FaHome}
                  number={50}
                  text="Familles d'accueil"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <StatCard 
                  icon={FaHandHoldingHeart}
                  number={1000}
                  text="Animaux sauvés par an"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
