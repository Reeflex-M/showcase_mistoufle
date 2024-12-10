import React from "react";

function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          1. Collecte des informations
        </h2>
        <p className="mb-4">
          Nous collectons les informations que vous nous fournissez directement
          lorsque vous :
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Remplissez un formulaire de contact</li>
          <li>Soumettez une demande d'adoption</li>
          <li>Vous inscrivez à notre newsletter</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Utilisation des informations
        </h2>
        <p className="mb-4">
          Les informations que nous collectons sont utilisées pour :
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Traiter vos demandes d'adoption</li>
          <li>Vous contacter concernant nos services</li>
          <li>Vous envoyer des informations sur nos activités</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Protection des données
        </h2>
        <p className="mb-4">
          Nous mettons en place des mesures de sécurité appropriées pour
          protéger vos informations personnelles. Vos données ne sont jamais
          vendues à des tiers et sont strictement utilisées dans le cadre de nos
          activités associatives.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Vos droits</h2>
        <p className="mb-4">
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification, de suppression et de portabilité de vos données
          personnelles. Pour exercer ces droits, contactez-nous via notre
          formulaire de contact.
        </p>
      </section>
    </div>
  );
}

export default Privacy;
