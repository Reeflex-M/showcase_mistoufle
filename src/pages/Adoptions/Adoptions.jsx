import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";

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
  const [postsCache, setPostsCache] = useState({
    chien: { posts: [], loading: true, error: null },
    chat: { posts: [], loading: true, error: null },
    chaton: { posts: [], loading: true, error: null },
    senior: { posts: [], loading: true, error: null },
    sauvetage: { posts: [], loading: true, error: null }
  });
  const [activeTab, setActiveTab] = useState("chien");

  // Fonction pour charger les posts d'une catégorie
  const fetchPostsForCategory = async (category) => {
    try {
      console.log("Fetching posts for category:", category);
      const response = await fetch(
        `http://localhost:3002/api/facebook-posts?category=${category}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      console.log("Received posts for", category, ":", data);
      return data.posts || [];
    } catch (err) {
      console.error("Error fetching posts for", category, ":", err);
      throw err;
    }
  };

  // Charger toutes les catégories au montage du composant
  useEffect(() => {
    const categories = ["senior", "sauvetage", "chien", "chat", "chaton"];
    
    const loadAllCategories = async () => {
      try {
        // Créer un tableau de promesses pour charger toutes les catégories en parallèle
        const promises = categories.map(category => fetchPostsForCategory(category));
        
        // Attendre que toutes les promesses soient résolues
        const results = await Promise.all(promises);
        
        // Mettre à jour le state avec tous les résultats
        const newCache = {};
        categories.forEach((category, index) => {
          newCache[category] = {
            posts: results[index],
            loading: false,
            error: null
          };
        });
        
        setPostsCache(newCache);
      } catch (error) {
        console.error("Error loading categories:", error);
        // En cas d'erreur, mettre à jour le state avec l'erreur pour toutes les catégories
        const errorCache = {};
        categories.forEach(category => {
          errorCache[category] = {
            posts: [],
            loading: false,
            error: "Erreur lors du chargement des données"
          };
        });
        setPostsCache(errorCache);
      }
    };

    loadAllCategories();
  }, []); // Ne s'exécute qu'au montage

  const categories = {
    chien: {
      name: "Chiens",
      icon: <HeartIcon className="w-5 h-5" />,
      color: "primary"
    },
    chat: {
      name: "Chats",
      icon: <HeartIcon className="w-5 h-5" />,
      color: "primary"
    },
    chaton: {
      name: "Chatons",
      icon: <HeartIcon className="w-5 h-5" />,
      color: "primary"
    },
    senior: {
      name: "Seniors",
      icon: <HeartIcon className="w-5 h-5" />,
      color: "amber"
    },
    sauvetage: {
      name: "Sauvetages",
      icon: <HeartIcon className="w-5 h-5" />,
      color: "amber"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <Tab.Group onChange={setActiveTab} defaultIndex={2}>
          <Tab.List className="flex justify-center space-x-2 p-1 mb-8 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
            {Object.entries(categories).map(([key, category]) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  `${
                    selected
                      ? category.color === "amber"
                        ? "bg-amber-500 text-white shadow-amber-200"
                        : "bg-primary text-white shadow-primary/20"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }
                  relative px-6 py-2.5 rounded-lg transition-all duration-200
                  font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${category.color === "amber" ? "focus:ring-amber-400" : "focus:ring-primary"}
                  ${selected ? "shadow-lg scale-105" : "hover:scale-102"}
                  flex items-center space-x-2`
                }
              >
                <span>{category.name}</span>
                {category.icon}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {Object.keys(categories).map((key) => (
              <Tab.Panel key={key}>
                {postsCache[key].loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Chargement des posts...</p>
                    </div>
                  </div>
                ) : key === 'senior' ? (
                  <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-600 text-xl">
                      Aucune publication d&apos;adoption disponible pour cette catégorie...
                    </p>
                  </div>
                ) : postsCache[key].error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 shadow-sm">
                    <p>Erreur: {postsCache[key].error}</p>
                  </div>
                ) : postsCache[key].posts.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-600 text-xl">
                      Aucune publication d&apos;adoption disponible pour cette catégorie...
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {postsCache[key].posts.map((post) => (
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
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Adoptions;
