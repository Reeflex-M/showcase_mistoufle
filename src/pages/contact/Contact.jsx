import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:associationlesmistoufles@laposte.net?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `De: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <ContactInfoCards />
        <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-xl shadow-md">
          <ContactForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <ContactMap />
        </div>
      </div>
    </div>
  );
}

export default Contact;
