import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";

// Déplacer PageHeader en dehors du composant principal
const PageHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12 pt-24"
  >
    <h1 className="text-5xl font-bold text-gray-800 mb-4">
      Les animaux à <span className="text-primary-dark">l'adoption</span>
    </h1>
    <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
  </motion.div>
);

function Adoptions() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("chien");

  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
    const fetchPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        console.log("Fetching posts for category:", activeTab);
        const response = await fetch(
          `http://localhost:3002/api/facebook-posts?category=${activeTab}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        console.log("Received posts:", data);
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab]); // Recharger quand activeTab change

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 shadow-sm">
            <p>Erreur: {error}</p>
          </div>
        )}

        <div className="flex justify-center space-x-6 mb-8">
          {["chien", "chat", "chaton"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                console.log("Changing tab to:", tab);
                setActiveTab(tab);
              }}
              className={`px-8 py-3 rounded-full transition-all duration-200 flex items-center space-x-2 ${
                activeTab === tab
                  ? "bg-primary-dark text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <HeartIcon
                className={`w-5 h-5 ${
                  activeTab === tab ? "text-white" : "text-primary"
                }`}
              />
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}s</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des posts...</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600 text-xl">
              Aucune publication d&apos;adoption disponible pour cette
              catégorie...
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {post.images && post.images.length > 0 && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.images[0]}
                      alt="Animal à l'adoption"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed">
                    {post.text}
                  </p>
                  <div className="flex justify-between items-center">
                    <time className="text-sm text-gray-500">{post.date}</time>
                    <HeartIcon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Adoptions;
