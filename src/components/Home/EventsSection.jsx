import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function EventsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let timeoutId;
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/facebook-posts?category=evenement",
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching events:", err);
          setError("Erreur lors du chargement des événements");
        }
      } finally {
        // Force un minimum de temps de chargement de 500ms pour éviter un flash
        timeoutId = setTimeout(() => setLoading(false), 500);
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-600">
            Aucun événement à venir pour le moment
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nos <span className="text-primary">Événements</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-lg bg-white">
            {posts.length > 0 && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {posts[currentSlide].images && posts[currentSlide].images.length > 0 && (
                  <div className="relative h-96">
                    <img
                      src={posts[currentSlide].images[0]}
                      alt="Événement"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-8 relative">
                  <p className="text-lg text-gray-800 whitespace-pre-wrap">
                    {posts[currentSlide].text}
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    {posts[currentSlide].date}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {posts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-800" />
              </button>

              <div className="flex justify-center mt-4 space-x-2">
                {posts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlide === index
                      ? "bg-primary scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                      }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;
