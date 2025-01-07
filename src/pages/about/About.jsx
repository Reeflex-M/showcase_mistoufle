import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaCat, FaDog, FaChevronDown, FaPaw, FaHeart, FaHome, FaHandHoldingHeart, FaExpand, FaDownload } from "react-icons/fa";
import { useScrollPosition } from 'react-use-scroll-position';

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="max-h-[90vh] max-w-[90vw] relative">
        <img 
          src={imageSrc} 
          alt="Image agrandie"
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

const ImageWithZoom = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative group">
      <img 
        src={src} 
        alt={alt} 
        className="w-full max-w-full sm:max-w-[800px] h-auto object-contain mx-auto rounded-lg shadow-md"
      />
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-2">
        <button
          onClick={handleDownload}
          className="bg-white/90 hover:bg-white text-primary-dark px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-md flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base"
        >
          <FaDownload className="text-sm" />
          <span>Télécharger</span>
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white/90 hover:bg-white text-primary-dark px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-md flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base"
        >
          <FaExpand className="text-sm" />
          <span>Agrandir</span>
        </button>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={src}
      />
    </div>
  );
};

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
    question: "Quelle est le fonctionnement de l'association ?",
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
              centaine de familles d'accueil
            </span>{" "}
            quotidiennement.
          </p>
          <div className="mt-3 pl-3 border-l-2 border-primary/30">
            <p className="text-primary-dark/70 italic text-sm sm:text-base">
              Cela permet aux animaux d'avoir un temps nécessaire pour des
              soins, de la sociabilisation et/ou une réadaptation à une vie de
              famille afin de leur redonner une nouvelle chance qu'ils méritent !
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
            <p className="text-3xl sm:text-4xl font-bold text-primary-darkest mb-1">1</p>
            <p className="text-sm text-primary-dark">Apprenti</p>
          </div>
          <div className="w-full sm:w-auto text-center px-4 py-2 bg-white rounded-lg shadow-sm">
            <p className="text-3xl sm:text-4xl font-bold text-primary-darkest mb-1">1</p>
            <p className="text-sm text-primary-dark">Service civique</p>
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
  {
    id: 4,
    question: "Vous avez trouvé un animal sur le territoire de morlaix communautauté, que faire ?",
    answer: (
      <div className="space-y-6">
        <ImageWithZoom 
          src="/about/quefaire1.png"
          alt="Que faire si vous trouvez un animal - étape 1"
        />
      </div>
    ),
  },
  {
    id: 5,
    question: "Vous avez trouvé un animal sur un territoire que nous ne gérons pas, que faire ?",
    answer: (
      <div className="space-y-6">
        <ImageWithZoom 
          src="/about/quefaire2.png"
          alt="Que faire si vous perdez votre animal"
        />
      </div>
    ),
  },
  {
    id: 6,
    question: "Puis-je réserver un animal ?",
    answer: (
      <div className="space-y-6">
        <div className="bg-primary-light p-3 sm:p-4 rounded-lg shadow-lg border-l-4 border-primary">
          <p className="font-medium text-primary-darkest text-sm sm:text-base">
            Non, nous ne prenons pas de réservation pour nos animaux. L'adoption se fait sur place, après une rencontre avec l'animal et un échange avec nos bénévoles pour s'assurer que l'adoption est réfléchie et adaptée à votre situation.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    question: "Quel jour je peux adopter ?",
    answer: (
      <div className="space-y-6">
        <div className="bg-primary-light p-3 sm:p-4 rounded-lg shadow-lg border-l-4 border-primary">
          <p className="font-medium text-primary-darkest text-sm sm:text-base">
            Les adoptions se font uniquement le samedi entre 14h et 18h. Merci de vous présenter pendant ces horaires pour rencontrer nos animaux, muni de votre carte d'identité.
          </p>
        </div>
      </div>
    ),
  },
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const answerRef = useRef(null);
  const questionRef = useRef(null);

  useEffect(() => {
    if (isOpen && questionRef.current) {
      // Attendre que l'animation d'ouverture commence
      setTimeout(() => {
        const yOffset = -100; // Offset pour tenir compte du header fixe
        const element = questionRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [isOpen]);

  return (
    <div
      ref={questionRef}
      className="border-b border-primary-light/30 last:border-none"
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
    </div>
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
    <div
      className="flex items-center gap-5 bg-white/50 p-5 rounded-xl border border-gray-100 transition-shadow hover:shadow-lg cursor-pointer group w-[260px]"
    >
      <div
        className="bg-primary/10 p-2.5 rounded-full"
      >
        <Icon className="text-3xl text-primary" />
      </div>
      <div className="flex flex-col">
        <span 
          className="text-3xl font-bold text-gray-900"
        >
          {count}
        </span>
        <span className="text-sm text-gray-600 group-hover:text-primary-darkest transition-colors">
          {text}
        </span>
      </div>
    </div>
  );
};

const About = () => {
  const [openId, setOpenId] = useState(null);
  const ref = useRef(null);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const infographicRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearFooter(entry.isIntersecting);
        if (entry.isIntersecting) {
          const footerElement = entry.target;
          setFooterHeight(footerElement.offsetHeight);
        }
      },
      {
        rootMargin: '100px',
      }
    );

    const footerElement = document.querySelector('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  return (
    <div
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
          <div
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
          </div>

          {/* FAQ Section */}
          <div
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
          </div>
        </div>

        {/* Fixed Infographic Column */}
        <div className="w-full lg:w-1/4 relative">
          <div className="hidden lg:block"> {/* Spacer div */}
            <div className="h-screen" />
          </div>
          {/* Version mobile */}
          <div className="lg:hidden mb-8">
            <div className="space-y-5">
              <StatCard 
                icon={FaCat}
                number={33}
                text="Chats en chatterie"
              />
              <StatCard 
                icon={FaHome}
                number={120}
                text="Familles d'accueil"
              />
              <StatCard 
                icon={FaHandHoldingHeart}
                number={1000}
                text="Animaux sauvés par an"
              />
            </div>
          </div>
          {/* Version desktop */}
          <div 
            ref={infographicRef}
            className="hidden lg:flex items-center fixed right-12 2xl:right-[calc((100vw-80rem)/4)]"
            style={{
              position: 'fixed',
              top: isNearFooter ? `calc(100vh - ${footerHeight + 350}px)` : '50%',
              transform: isNearFooter ? 'none' : 'translateY(-50%)',
              transition: 'all 0.5s ease-out'
            }}
          >
            <div className="space-y-5">
              <StatCard 
                icon={FaCat}
                number={33}
                text="Chats en chatterie"
              />
              <StatCard 
                icon={FaHome}
                number={120}
                text="Familles d'accueil"
              />
              <StatCard 
                icon={FaHandHoldingHeart}
                number={1000}
                text="Animaux sauvés par an"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
