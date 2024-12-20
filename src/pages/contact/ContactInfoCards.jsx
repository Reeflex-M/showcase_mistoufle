import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function ContactInfoCards() {
  const cards = [
    {
      icon: <FaPhone />,
      title: "Téléphone",
      content: (
        <>
          <div>02 98 62 84 85</div>
          <div className="underline">Mardi et Jeudi de 15h à 18h</div>
        </>
      ),
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "associationlesmistoufles@laposte.net",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Adresse",
      content: "Saint-Martin-des-Champs, France",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <span className="text-xl">{card.icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {card.title}
              </h3>
              <div className="text-gray-600">{card.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactInfoCards;
