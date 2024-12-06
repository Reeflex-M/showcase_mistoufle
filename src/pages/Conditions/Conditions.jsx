import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDog, FaCat } from "react-icons/fa";
import { MdPersonOutline, MdHome, MdAttachMoney, MdTimeline } from "react-icons/md";

function Conditions() {
  const [activeTab, setActiveTab] = useState("chiens");

  const TabButton = ({ id, icon: Icon, label }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 w-full md:w-64 p-4 rounded-xl transition-all duration-300 ${activeTab === id
        ? "bg-primary text-white shadow-lg"
        : "bg-white hover:bg-primary/5"
        }`}
    >
      <Icon size={24} />
      <span className="font-medium">{label}</span>
    </motion.button>
  );

  const ContentSection = ({ icon: Icon, title, children }) => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon size={24} className="text-primary" />
        <h3 className="text-xl font-semibold text-primary-darkest">{title}</h3>
      </div>
      {children}
    </motion.section>
  );

  const tabContent = {
    chiens: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Conditions d&apos;adoption - Chiens
        </h2>
        <div className="grid gap-6">
          <ContentSection icon={MdPersonOutline} title="Critères de base">
            <ul className="list-none space-y-3">
              <li>Être majeur et présenter une pièce d&apos;identité valide</li>
              <li>Avoir un logement adapté à l&apos;animal</li>
              <li>Disposer de ressources financières suffisantes</li>
            </ul>
          </ContentSection>

          <ContentSection icon={MdTimeline} title="Processus d'adoption">
            <ul className="list-none space-y-3">
              <li>Rencontre initiale avec le chien</li>
              <li>Entretien avec nos équipes</li>
              <li>Période d&apos;adaptation de 2 semaines</li>
            </ul>
          </ContentSection>

          <ContentSection icon={MdAttachMoney} title="Tarifs d'adoption">
            <div className="grid gap-4">
              <ul className="list-none space-y-3">
                <li>
                  <strong>Chiot de moins de 6 mois :</strong> 250€, ce montant
                  comprend l’identification, la primo-vaccination (CCHPL), le
                  déparasitage. La stérilisation est obligatoire et à la charge de
                  l’adoptant. (Un chèque de caution sera demandé au moment de
                  l’adoption).
                </li>
                <li>
                  <strong>Chien de plus de 6 mois :</strong> 250€, ce montant
                  comprend l’identification, la primo-vaccination (CCHPL), le
                  déparasitage et la stérilisation.
                </li>
                <li>
                  <strong>Chien de plus de 10 ans :</strong> Don libre, ce montant
                  comprend l’identification, la primo-vaccination (CCHPL), le
                  déparasitage. La stérilisation sera effectuée suivant l’état de
                  santé de l’animal.
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Conditions d&apos;adoption - Chats
        </h2>
        <div className="grid gap-6">
          <ContentSection icon={MdPersonOutline} title="Critères de base">
            <ul className="list-none space-y-3">
              <li>Être majeur et présenter une pièce d&apos;identité valide</li>
              <li>S&apos;engager à la stérilisation</li>
            </ul>
          </ContentSection>

          <ContentSection icon={MdTimeline} title="Processus d'adoption">
            <ul className="list-none space-y-3">
              <li>Visite et rencontre avec le chat</li>
              <li>Validation du dossier d&apos;adoption</li>
              <li>Suivi post-adoption</li>
            </ul>
          </ContentSection>

          <ContentSection icon={MdAttachMoney} title="Tarifs d'adoption">
            <div className="grid gap-4">
              <ul className="list-none space-y-3">
                <li>
                  <strong>Chaton de moins de 6 mois :</strong> 130€, ce montant
                  comprend l’identification, la primo-vaccination (typhus,
                  coryza), le déparasitage. La stérilisation est obligatoire et à
                  la charge de l’adoptant (un chèque de caution sera demandé au
                  moment de l’adoption).
                </li>
                <li>
                  <strong>Chat mâle de plus de 6 mois :</strong> 150€,
                  comprend l’identification, la primo-vaccination (typhus,
                  coryza), le déparasitage et la castration.
                </li>
                <li>
                  <strong>Chat femelle de plus de 6 mois :</strong> 170€, ce
                  montant comprend l’identification, la primo-vaccination (typhus,
                  coryza), le déparasitage et la stérilisation.
                </li>
                <li>
                  <strong>Chat de plus de 10 ans :</strong> Don libre, ce montant
                  comprend l’identification, la primo-vaccination (typhus,
                  coryza), le déparasitage. La stérilisation sera effectuée
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
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:items-start md:pt-12">
          {/* Navigation Tabs - Centered */}
          <div className="w-full md:w-64 h-[120px] md:h-auto flex md:flex-col gap-4 md:sticky md:top-32 items-center md:items-start shrink-0">
            <TabButton id="chiens" icon={FaDog} label="Adoption Chiens" />
            <TabButton id="chats" icon={FaCat} label="Adoption Chats" />
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
