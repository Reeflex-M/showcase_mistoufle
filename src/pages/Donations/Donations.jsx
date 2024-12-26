import { motion } from "framer-motion";

function Donations() {
  const donationMethods = [
    {
      title: "HelloAsso",
      description: "Faites un don en ligne sécurisé via HelloAsso",
      link: "https://www.helloasso.com/associations/les-mistoufles/formulaires/1",
      icon: "🌐"
    },
    {
      title: "Chèque",
      description: "Envoyez votre don par chèque à l'ordre de 'Les Mistoufles'",
      icon: "✉️"
    },
    {
      title: "Virement  ",
      description: "Contactez-nous pour faire un don en espèces",
      icon: "💶"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <h1 className="text-4xl font-bold text-center mb-8">Faire un don</h1>
      <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
        Votre générosité nous aide à continuer notre mission de protection et de soin des animaux.
        Choisissez la méthode de don qui vous convient le mieux.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {donationMethods.map((method) => (
          <motion.div
            key={method.title}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">{method.icon}</div>
            <h2 className="text-2xl font-semibold mb-3">{method.title}</h2>
            <p className="text-gray-600 mb-4">{method.description}</p>
            {method.link && (
              <a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-dark text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all duration-200"
              >
                Faire un don
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Donations;
