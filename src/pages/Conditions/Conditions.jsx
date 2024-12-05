import { useState } from "react";

function Conditions() {
  const [activeTab, setActiveTab] = useState("chiens");

  const tabContent = {
    chiens: (
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Conditions d'adoption - Chiens
        </h2>
        <div className="space-y-4">
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Critères de base
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Être majeur et présenter une pièce d'identité valide</li>
              <li>Avoir un logement adapté à l'animal</li>
              <li>Disposer de ressources financières suffisantes</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Processus d'adoption
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Rencontre initiale avec le chien</li>
              <li>Entretien avec nos équipes</li>
              <li>Période d'adaptation de 2 semaines</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Tarifs d'adoption
            </h3>
            <ul className="list-disc pl-5 space-y-2">
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
            <p className="mt-4">
              Nos tarifs peuvent varier suivant la race ou les difficultés de
              certains de nos protégés.
            </p>
          </section>
        </div>
      </div>
    ),
    chats: (
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Conditions d'adoption - Chats
        </h2>
        <div className="space-y-4">
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Critères de base
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Être majeur et présenter une pièce d'identité valide</li>
              <li>Avoir un environnement sécurisé</li>
              <li>S'engager à la stérilisation</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Processus d'adoption
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Visite et rencontre avec le chat</li>
              <li>Validation du dossier d'adoption</li>
              <li>Suivi post-adoption</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Tarifs d'adoption
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Chaton de moins de 6 mois :</strong> 130€, ce montant
                comprend l’identification, la primo-vaccination (typhus,
                coryza), le déparasitage. La stérilisation est obligatoire et à
                la charge de l’adoptant (un chèque de caution sera demandé au
                moment de l’adoption).
              </li>
              <li>
                <strong>Chat mâle de plus de 6 mois :</strong> 150€, ce montant
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
            <p className="mt-4">
              Nos tarifs peuvent varier suivant la race ou les difficultés de
              certains de nos protégés.
            </p>
          </section>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex h-full">
          {/* Sidebar Navigation */}
          <div className="w-72 border-r border-gray-200">
            <div className="p-6 space-y-3">
              <button
                onClick={() => setActiveTab("chiens")}
                className={`w-full text-left px-6 py-4 rounded-lg transition-colors ${
                  activeTab === "chiens"
                    ? "bg-primary text-white"
                    : "bg-primary-light hover:bg-primary/10"
                }`}
              >
                Adoption Chiens
              </button>
              <button
                onClick={() => setActiveTab("chats")}
                className={`w-full text-left px-6 py-4 rounded-lg transition-colors ${
                  activeTab === "chats"
                    ? "bg-primary text-white"
                    : "bg-primary-light hover:bg-primary/10"
                }`}
              >
                Adoption Chats
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 overflow-auto">
            <h1 className="text-4xl font-heading text-primary mb-8">
              Conditions d'adoption
            </h1>
            <div className="pr-4">{tabContent[activeTab]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conditions;
