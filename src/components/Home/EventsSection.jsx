import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function EventsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/facebook-posts");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || "Failed to fetch posts");
        }

        const data = await response.json();
        const matchaPosts = data.filter(post => 
          post.text && post.text.includes("Matcha")
        );
        setPosts(matchaPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="relative bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement des événements...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Erreur: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white">
      <section className="relative min-h-screen pb-0">
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

          {posts.length === 0 ? (
            <p className="text-gray-600 text-center">
              Aucun événement disponible pour le moment...
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.images && post.images.length > 0 && (
                    <div className="relative h-80">
                      <img
                        src={post.images[0]}
                        alt="Image de l'événement"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <p className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed">
                      {post.text}
                    </p>
                    <time className="block text-sm text-gray-500">
                      {new Date(post.created_time).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <div className="h-32 bg-white"></div>
    </div>
  );
}

export default EventsSection;
