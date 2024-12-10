function Home() {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1>Page d'accueil</h1>
      {/* Si vous avez une image, ajoutez ceci : */}
      <img
        src="..."
        alt="..."
        className="relative z-0" // Z-index plus bas que le footer
      />
    </div>
  );
}

export default Home;
