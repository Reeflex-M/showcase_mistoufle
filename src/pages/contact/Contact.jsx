import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import HeroSection from "./HeroSection";
import ContactInfoCards from "./ContactInfoCards";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Envoi en cours...' });

    try {
      const templateParams = {
        to_name: "Association Les Mistoufles",
        to_email: "associationlesmistoufles@laposte.net",
        from_name: formData.name,
        from_email: "associationlesmistoufles@laposte.net", // Utiliser l'adresse La Poste comme expéditeur
        reply_to: formData.email, // L'email du visiteur en reply-to
        subject: formData.subject,
        message: formData.message,
      };

      console.log('Tentative d\'envoi avec les paramètres:', {
        ...templateParams,
        serviceId: "service_xedy51t",
        templateId: "template_2g07e1n"
      });

      // Configuration pour La Poste
      emailjs.init("nBlY0kvDECgmyz5Dz");
      
      const response = await emailjs.send(
        "service_xedy51t",
        "template_2g07e1n",
        templateParams,
        "nBlY0kvDECgmyz5Dz"
      );

      console.log('Réponse du serveur:', response);
      setStatus({ type: 'success', message: 'Message envoyé avec succès!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setStatus({ 
        type: 'error', 
        message: `Erreur lors de l'envoi du message: ${error.text || error.message}. Vérifiez la console pour plus de détails.` 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ContactInfoCards />
        
        <div className="mt-16 flex flex-col md:flex-row gap-12">
          <ContactForm 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            status={status}
          />
          <ContactMap />
        </div>
      </div>
    </div>
  );
}

export default Contact;
