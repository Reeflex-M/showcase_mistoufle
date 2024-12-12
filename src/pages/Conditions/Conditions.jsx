import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDog, FaCat, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import {
  MdPersonOutline,
  MdHome,
  MdAttachMoney,
  MdTimeline,
  MdHelp,
} from "react-icons/md";
import { Tooltip } from "react-tooltip";

function Conditions() {
  const [activeTab, setActiveTab] = useState("chiens");
  const [expandedSection, setExpandedSection] = useState(null);

  const TabButton = ({ id, icon: Icon, label, className }) => (
    <motion.button
      whileHover={{
        scale: 1.015,
        backgroundColor: activeTab === id ? undefined : "rgb(243 244 246)",
      }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 w-full md:w-64 p-4 rounded-xl transition-colors duration-200 ${
        activeTab === id ? "bg-primary text-white shadow-md" : "bg-white"
      } ${className}`}
      aria-label={`Voir les conditions pour ${label}`}
      aria-current={activeTab === id ? "page" : undefined}
      role="tab"
    >
      <Icon size={24} />
      <span className="font-medium">{label}</span>
    </motion.button>
  );

  const ContentSection = ({ icon: Icon, title, children, id }) => (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full"
        aria-expanded={expandedSection === id}
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon size={24} className="text-primary" />
          <h3 className="text-xl font-semibold text-primary-darkest">
            {title}
          </h3>
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: expandedSection === id ? "auto" : 0,
          opacity: expandedSection === id ? 1 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          opacity: { duration: 0.2 },
        }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.section>
  );

  const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
        {number}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  const InfoPoint = ({ text, tooltipId, tooltipContent }) => (
    <>
      <li className="flex items-start gap-2">
        <FaCheckCircle className="flex-shrink-0 mt-1 text-primary" />
        <span>{text}</span>
        {tooltipContent && (
          <>
            <FaInfoCircle
              className="flex-shrink-0 mt-1 text-gray-400 cursor-help"
              data-tooltip-id={tooltipId}
            />
            <Tooltip id={tooltipId} place="right">
              {tooltipContent}
            </Tooltip>
          </>
        )}
      </li>
    </>
  );

  const tabContent = {
    chiens: (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Adopter un <span className="text-primary-dark">chien</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez les étapes et conditions pour accueillir votre futur
            compagnon à quatre pattes
          </p>
          <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
        </div>
        <div className="grid gap-6">
          <ContentSection
            icon={MdPersonOutline}
            title="Modalités de base"
            id="chiens-criteres"
          >
            <ul className="list-none space-y-3">
              <InfoPoint text="Être majeur et présenter une pièce d'identité valide" />
              <InfoPoint text="Avoir un logement adapté à l'animal" />
              <InfoPoint text="Disposer de ressources financières suffisantes" />
            </ul>
          </ContentSection>

          <ContentSection
            icon={MdTimeline}
            title="Processus d'adoption"
            id="chiens-processus"
          >
            <div className="grid gap-4">
              <InfoPoint text="Nous discutons avec vous de vos attentes et de vos capacités à prendre soin d'un chien." />
            </div>
          </ContentSection>

          <ContentSection
            icon={MdAttachMoney}
            title="Tarifs d'adoption"
            id="chiens-tarifs"
          >
            <div className="grid gap-4">
              <p className="text-gray-600 mb-4">
                La participation versée lors de l'adoption sert à payer la
                nourriture, la stérilisation, l'identification et les soins
                nécessaires aux animaux.
              </p>
              <ul className="list-none space-y-3">
                <li>
                  <strong>Chiot de moins de 6 mois :</strong> 250€, ce montant
                  comprend l’identification, la primo-vaccination (CCHPL), le
                  déparasitage. La stérilisation est obligatoire et à la charge
                  de l’adoptant. (Un chèque de caution sera demandé au moment de
                  l’adoption).
                </li>
                <li>
                  <strong>Chien de plus de 6 mois :</strong> 250€, ce montant
                  comprend l’identification, la primo-vaccination (CCHPL), le
                  déparasitage et la stérilisation.
                </li>
                <li>
                  <strong>Chien de plus de 10 ans :</strong> Don libre, ce
                  montant comprend l’identification, la primo-vaccination
                  (CCHPL), le déparasitage. La stérilisation sera effectuée
                  suivant l’état de santé de l’animal.
                </li>
              </ul>
              <p className="mt-1">
                Nos tarifs peuvent varier suivant la race ou les difficultés de
                certains de nos protégés.
              </p>
            </div>
          </ContentSection>
        </div>
      </motion.div>
    ),
    chats: (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Adopter un <span className="text-primary-dark">chat</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Apprenez tout ce qu'il faut savoir pour adopter votre nouveau félin
          </p>
          <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
        </div>
        <div className="grid gap-6">
          <ContentSection
            icon={MdPersonOutline}
            title="Modalité de base"
            id="chats-criteres"
          >
            <ul className="list-none space-y-3">
              <InfoPoint text="Être majeur et présenter une pièce d'identité valide" />
              <InfoPoint text="Avoir un logement adapté à l'animal" />
              <InfoPoint text="Disposer de ressources financières suffisantes" />
              <InfoPoint text="S'engager à la stérilisation" />
            </ul>
          </ContentSection>

          <ContentSection
            icon={MdTimeline}
            title="Processus d'adoption"
            id="chats-processus"
          >
            <InfoPoint text="Nous discutons avec vous de vos attentes et de vos capacités à prendre soin d'un chat." />
          </ContentSection>

          <ContentSection
            icon={MdAttachMoney}
            title="Tarifs d'adoption"
            id="chats-tarifs"
          >
            <div className="grid gap-4">
              <p className="text-gray-600 mb-4">
                La participation versée lors de l'adoption sert à payer la
                nourriture, la stérilisation, l'identification et les soins
                nécessaires aux animaux.
              </p>
              <ul className="list-none space-y-3">
                <li>
                  <strong>Chaton de moins de 6 mois :</strong> 130€, ce montant
                  comprend l’identification, la primo-vaccination (typhus,
                  coryza), le déparasitage. La stérilisation est obligatoire et
                  à la charge de l’adoptant (un chèque de caution sera demandé
                  au moment de l’adoption).
                </li>
                <li>
                  <strong>Chat mâle de plus de 6 mois :</strong> 150€, comprend
                  l’identification, la primo-vaccination (typhus, coryza), le
                  déparasitage et la castration.
                </li>
                <li>
                  <strong>Chat femelle de plus de 6 mois :</strong> 170€, ce
                  montant comprend l’identification, la primo-vaccination
                  (typhus, coryza), le déparasitage et la stérilisation.
                </li>
                <li>
                  <strong>Chat de plus de 10 ans :</strong> Don libre, ce
                  montant comprend l’identification, la primo-vaccination
                  (typhus, coryza), le déparasitage. La stérilisation sera
                  effectuée suivant l’état de santé de l’animal.
                </li>
              </ul>
              <p className="mt-1">
                Nos tarifs peuvent varier suivant la race ou les difficultés de
                certains de nos protégés.
              </p>
            </div>
          </ContentSection>
        </div>
      </motion.div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Conditions <span className="text-primary-dark">d'adoptions</span>
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 md:items-start md:pt-12">
          {/* Navigation Tabs - Centered */}
          <div className="w-full md:w-64 h-[120px] md:h-auto flex md:flex-col gap-4 md:sticky md:top-32 items-center md:items-start shrink-0">
            <TabButton
              id="chiens"
              icon={FaDog}
              label="Adoption Chiens"
              className="bg-primary-dark"
            />
            <TabButton
              id="chats"
              icon={FaCat}
              label="Adoption Chats"
              className="bg-primary-dark"
            />
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {tabContent[activeTab]}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conditions;
