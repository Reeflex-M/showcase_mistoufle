import React from "react";
import {
  FaBuilding,
  FaUser,
  FaLaptopCode,
  FaServer,
  FaCamera,
  FaFileAlt,
  FaCopyright,
  FaShieldAlt,
} from "react-icons/fa";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Mentions Légales
        </h1>

        <div className="grid gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaBuilding className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Propriétaire du site
              </h2>
            </div>
            <p className="text-gray-600">
              Association les Mistoufles – Rue du Grand Launay – 29600
              Saint-Martin-des-Champs
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaUser className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Responsable de publication
              </h2>
            </div>
            <p className="text-gray-600">Camille FLOCH, Bénévole</p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaLaptopCode className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Réalisation du site
              </h2>
            </div>
            <p className="text-gray-600">
              Mathis Floch
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaServer className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Hébergement
              </h2>
            </div>
            <div className="text-gray-600 space-y-2">
              <p>LWS</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaCamera className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Crédits</h2>
            </div>
            <p className="text-gray-600">
              Pour les photos du site : Association les Mistoufles, pixabay
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaFileAlt className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Contenu du site
              </h2>
            </div>
            <p className="text-gray-600">
              Les informations disponibles dans ce site sont purement
              informatives. Le site est régulièrement mis à jour. Cependant,
              aucune garantie n’est apportée concernant l’exactitude, la
              précision, la fréquence de mise à jour des informations publiées
              sur ce site. L’Association les Mistoufles décline donc toute
              responsabilité pour d’éventuels litiges résultant notamment d’une
              imprécision ou inexactitude des informations disponibles sur son
              site.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaCopyright className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Droits d’auteur
              </h2>
            </div>
            <p className="text-gray-600">
              Tous droits réservés. Les textes, images, illustrations et autres
              médias sont soumis à la protection du droit d’auteur. Toute
              reproduction, modification, transmission du contenu de ce site
              pour une publication écrite ou électronique est strictement
              interdite sauf autorisation préalable du responsable de
              publication.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Données collectées
              </h2>
            </div>
            <p className="text-gray-600">
              Lors de vos envois de formulaires, les données sont collectées par
              l’Association les Mistoufles pendant une durée limitée. Ces
              informations resteront strictement confidentielles et ne seront
              pas communiquées à des tiers. La loi « Informatique et Libertés »
              du 6 janvier 1978 modifiée par la loi du 6 août 2004 encadre la
              mise en œuvre des fichiers ou des traitements de données à
              caractère personnel qu’ils soient automatisés ou manuels. Vous
              disposez d’un droit d’accès, de modification, de rectification et
              de suppression des données qui vous concernent (art. 34 de la loi
              « Informatique et Libertés »). Vous pouvez l’exercer par courrier
              en écrivant à : Association les Mistoufles, Rue du Grand Launay,
              29600 Saint-Martin-des-Champs. Vous pouvez également exercer votre
              droit d’accès, de modification, de rectification et suppression
              des données via une demande par e-mail :
              associationlesmistoufles@laposte.net
            </p>
            <p className="text-gray-600 mt-4">
              Le présent site web collecte des données personnelles via des
              formulaires de saisie uniquement dans une but d’information et de
              communication. Conformément à l’ordonnance n° 2018-1125 du 12
              décembre 2018, publiée le 13 décembre 2018, il n’a pas fait
              l’objet d’une déclaration spécifique auprès de la CNIL.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
