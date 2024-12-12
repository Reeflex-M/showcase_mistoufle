import { useState, useEffect } from "react";

function Adoptions() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");
        const response = await fetch(
          "http://localhost:3002/api/facebook-posts"
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || "Failed to fetch posts");
        }

        const data = await response.json();
        console.log("Received posts:", data);
        //setPosts(data);
        // Filter posts containing "Adoptez"
        const adoptionPosts = data.filter(post => 
          post.text && post.text.includes("Adoptez")
        );
        setPosts(adoptionPosts);
        setLoading(false);
        //here
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
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des posts Facebook...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-heading text-primary-dark mb-8">
            Les animaux à l&apos;adoption
          </h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Erreur: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto" style={{ marginTop: '20px' }}>
        <h1 className="text-5xl font-heading text-primary-dark">
          Les animaux à l&apos;adoption
        </h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Découvrez nos adorables compagnons en attente d&apos;un nouveau foyer
        </p>

        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">
            Aucune publication d&apos;adoption disponible pour le moment...
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.images && post.images.length > 0 && (
                  <div className="relative h-80">
                    <img
                      src={post.images[0]}
                      alt="Animal à l'adoption"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed">
                    {post.text}
                  </p>
                  <time className="block text-sm text-gray-500">
                    {post.date || 'Date non disponible'}
                  </time>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Adoptions;
