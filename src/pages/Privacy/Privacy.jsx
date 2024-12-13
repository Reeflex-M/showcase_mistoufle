import React from "react";
import {
  FaShieldAlt,
  FaUserLock,
  FaClipboardList,
  FaUserCog,
} from "react-icons/fa";

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Politique de Confidentialité
        </h1>

        <div className="grid gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaClipboardList className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Collecte des informations
              </h2>
            </div>
            <p className="mb-4 text-gray-600">
              Nous collectons les informations que vous nous fournissez
              directement lorsque vous :
            </p>
            <ul className="list-none space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Remplissez un formulaire de contact
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Soumettez une demande d&apos;adoption
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaUserLock className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                2. Utilisation des informations
              </h2>
            </div>
            <p className="mb-4 text-gray-600">
              Les informations que nous collectons sont utilisées pour :
            </p>
            <ul className="list-none space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Traiter vos demandes d&apos;adoption
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Vous contacter concernant nos services
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Vous envoyer des informations sur nos activités
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                3. Protection des données
              </h2>
            </div>
            <p className="mb-4 text-gray-600">
              Nous mettons en place des mesures de sécurité appropriées pour
              protéger vos informations personnelles. Vos données ne sont jamais
              vendues à des tiers et sont strictement utilisées dans le cadre de
              nos activités associatives.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaUserCog className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                4. Vos droits
              </h2>
            </div>
            <p className="mb-4 text-gray-600">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification, de suppression et de portabilité de vos données
              personnelles. Pour exercer ces droits, contactez-nous via notre
              formulaire de contact.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
