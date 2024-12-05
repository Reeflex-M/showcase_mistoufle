import { motion } from "framer-motion";
import EventCard from "./EventCard";

function EventsSection() {
  const events = [
    {
      image: "/event1.jpg",
      title: "Journée d'adoption",
      description:
        "Venez rencontrer nos adorables animaux en quête d'un foyer aimant.",
      date: "15 Mai 2024 | 10h-18h",
      delay: 0.2,
    },
    {
      image: "/event2.jpg",
      title: "Grande collecte",
      description: "Collecte de nourriture et de matériel pour nos protégés.",
      date: "20 Mai 2024 | 9h-17h",
      delay: 0.4,
    },
    {
      image: "/event3.jpg",
      title: "Portes ouvertes",
      description:
        "Découvrez notre refuge et nos actions pour la protection animale.",
      date: "1 Juin 2024 | 14h-19h",
      delay: 0.6,
    },
  ];

  return (
    <section className="relative bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-heading text-center mb-12"
        >
          Événements à venir
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;
