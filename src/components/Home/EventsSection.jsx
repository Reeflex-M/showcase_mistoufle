import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    let timeoutId;
    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3002/api/facebook-events?type=${activeTab}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.events || []);
        timeoutId = setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching events:", err);
          setError(err.message);
          timeoutId = setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      }
    };

    fetchEvents();
    setCurrentSlide(0); // Reset to first slide when changing tabs

    return () => {
      controller.abort();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeTab]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const getAdjacentSlides = () => {
    const prev = (currentSlide - 1 + events.length) % events.length;
    const next = (currentSlide + 1) % events.length;
    return { prev, next };
  };

  const TabButton = ({ type, label }) => (
    <button
      onClick={() => setActiveTab(type)}
      className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors
        ${activeTab === type
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
      {label}
    </button>
  );

  return (
    <section className="py-8 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Nos Événements</h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          <TabButton type="upcoming" label="À venir" />
          <TabButton type="past" label="Passés" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-gray-600">Chargement des événements...</p>
            </div>
          </div>
        ) : error ? (
          null
        ) : events.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-500">
              {activeTab === 'upcoming' 
                ? "Aucun événement à venir pour le moment"
                : "Aucun événement passé à afficher"}
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="flex justify-center items-center">
              {events.length > 1 && (
                <button
                  onClick={prevSlide}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                  aria-label="Previous event"
                >
                  <ChevronLeftIcon className="h-4 w-4 md:h-6 md:w-6" />
                </button>
              )}

              <div className="w-full max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    {events[currentSlide] && (
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {events[currentSlide].name}
                        </h3>
                        <div className="text-gray-600 mb-4">
                          <p>
                            {format(new Date(events[currentSlide].start_time), "EEEE d MMMM yyyy 'à' HH'h'mm", { locale: fr })}
                          </p>
                          {events[currentSlide].place && (
                            <p className="mt-1">
                              📍 {events[currentSlide].place.name}
                            </p>
                          )}
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">
                          {events[currentSlide].description}
                        </p>
                        {events[currentSlide].cover && (
                          <img
                            src={events[currentSlide].cover.source}
                            alt={events[currentSlide].name}
                            className="mt-4 w-full h-64 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {events.length > 1 && (
                <button
                  onClick={nextSlide}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                  aria-label="Next event"
                >
                  <ChevronRightIcon className="h-4 w-4 md:h-6 md:w-6" />
                </button>
              )}
            </div>

            {events.length > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    aria-label={`Aller à l'événement ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsSection;
