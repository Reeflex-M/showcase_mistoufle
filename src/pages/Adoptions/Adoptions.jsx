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
          "http://localhost:3001/api/facebook-posts"
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || "Failed to fetch posts");
        }

        const data = await response.json();
        console.log("Received posts:", data);
        setPosts(data);
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading text-primary mb-8">
            Les animaux à l'adoption
          </h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Erreur: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading text-primary mb-8">
          Les animaux à l'adoption
        </h1>

        {posts.length === 0 ? (
          <p className="text-gray-600">
            Aucun post disponible pour le moment...
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.images && post.images.length > 0 && (
                  <div className="relative h-72">
                    <img
                      src={post.images[0]}
                      alt="Animal à l'adoption"
                      className="w-full h-full object-cover"
                    />
                    {post.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                        +{post.images.length - 1} photos
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <p className="text-gray-700 mb-4 whitespace-pre-wrap text-sm">
                    {post.text}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    {post.link && (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition-colors"
                      >
                        Voir sur Facebook
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Adoptions;
