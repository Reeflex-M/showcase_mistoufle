import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function ContactInfoCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <FaPhone className="text-primary text-2xl mb-4" />
        <h3 className="font-medium text-lg mb-2">Téléphone</h3>
        <p className="text-gray-600">+33 (0)2 98 XX XX XX</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <FaEnvelope className="text-primary text-2xl mb-4" />
        <h3 className="font-medium text-lg mb-2">Email</h3>
        <p className="text-gray-600">associationlesmistoufles@laposte.net</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <FaMapMarkerAlt className="text-primary text-2xl mb-4" />
        <h3 className="font-medium text-lg mb-2">Adresse</h3>
        <p className="text-gray-600">Saint-Martin-des-Champs, France</p>
      </div>
    </div>
  );
}

export default ContactInfoCards;
