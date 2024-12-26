import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
import { FaDog, FaCat } from 'react-icons/fa';
import { PiCatFill } from 'react-icons/pi';
import { Tab } from "@headlessui/react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

const ITEMS_PER_PAGE = 6;

function Adoptions() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("chien");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = {
    chien: {
      name: "Chiens",
      icon: <FaDog className="w-6 h-6" />,
      color: "primary",
      hashtag: "#chien"
    },
    chaton: {
      name: "Chatons",
      icon: <PiCatFill className="w-6 h-6" />,
      color: "primary",
      hashtag: "#chaton"
    },
    chat: {
      name: "Chats",
      icon: <FaCat className="w-6 h-6" />,
      color: "primary",
      hashtag: "#chat"
    },
    senior: {
      name: "Seniors",
      icon: <FaDog className="w-6 h-6 text-white animate-pulse" />,
      color: "urgent",
      urgentColor: "bg-primary-dark/80",
      hashtag: "#senior"
    },
    sauvetage: {
      name: "Sauvetages",
      icon: <FaCat className="w-6 h-6 text-white animate-bounce" />,
      color: "urgent",
      urgentColor: "from-red-600 to-rose-600",
      hashtag: "#sauvetage"
    }
  };

  const seniorAdvantagesText = `nous vous rappelons également que tout adoption de chat senior entre dans le cadre du dispositif "Opération doyens" financée par notre partenaire 30 Millions d'amis ! 

Cela veut dire qu'en cas d'adoption d'un chat dit âgé (à partir de 10 ans) au sein de notre refuge, d'abord l'adoption est en don libre (à partir de 50 euros) mais cela permet également via cette opération, de bénéficier d'un soutien financier pour les frais vétérinaires après l'adoption à hauteur de 800 euros maximum sur présentation de factures.
`;

  const sauvetageText = `Nos sauvetages sont des chats qui ont été secourus dans des conditions difficiles. Ils peuvent avoir besoin de soins particuliers ou d'une attention spéciale. 

En les adoptant, vous leur offrez une seconde chance et une nouvelle vie remplie d'amour. Chaque adoption de sauvetage est un acte de bienveillance qui change une vie !`;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-albums`);
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        setAlbums(data.albums);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // Reset la page courante quand on change d'onglet
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filterAlbumsByCategory = (category) => {
    const hashtag = categories[category].hashtag;
    return albums.filter(album => {
      const searchText = `${album.name} ${album.description || ''}`.toLowerCase();
      if (category === 'chat') {
        return searchText.includes('#chat') && !searchText.includes('#chaton');
      }
      return searchText.includes(hashtag);
    });
  };

  const getPaginatedAlbums = (filteredAlbums) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAlbums.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll vers le haut de la page avec une animation fluide
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        
        <span className="text-gray-700">
          Page {currentPage} sur {totalPages}
        </span>
        
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader />
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader />
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            Une erreur est survenue lors du chargement des albums.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />
      <div className="max-w-6xl mx-auto px-4 pb-16 safe-area-inset-bottom">
        <Tab.Group onChange={setActiveTab} defaultIndex={0}>
          <Tab.List className="flex flex-wrap justify-center gap-3 p-4 mb-8 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
            {Object.entries(categories).map(([key, category]) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  `${selected
                    ? category.color === "urgent"
                      ? `bg-gradient-to-r ${category.urgentColor} text-white shadow-xl shadow-${category.urgentColor.split('-')[1]}-500/40`
                      : "bg-primary-dark text-white shadow-primary/20"
                    : category.color === "urgent"
                      ? `bg-gradient-to-br ${category.urgentColor} text-white hover:shadow-lg`
                      : "text-gray-600 hover:bg-gray-100"
                  }
                  relative px-6 py-3 rounded-lg transition-all duration-300
                  font-medium focus:outline-none 
                  ${category.color === "urgent"
                    ? "text-lg transform hover:scale-105 hover:-translate-y-1 ring-2 ring-white/50 ring-offset-2 ring-offset-gray-50"
                    : ""}
                  ${selected ? "transform scale-105" : ""}
                  flex items-center space-x-2 touch-manipulation`
                }
              >
                {category.icon}
                <span className="select-none font-semibold">{category.name}</span>
                {(key === 'senior' || key === 'sauvetage') && (
                  <>
                    <span className="absolute -top-2 -right-2 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-white"></span>
                    </span>
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -right-4 -left-4 -bottom-2 h-1.5 bg-white/50 rounded-full blur-sm"
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-8">
            {Object.keys(categories).map((category) => {
              const filteredAlbums = filterAlbumsByCategory(category);
              const paginatedAlbums = getPaginatedAlbums(filteredAlbums);
              
              return (
                <Tab.Panel key={category}>
                  {category === 'senior' && (
                    <div className="mb-8 bg-primary/20 p-6 rounded-lg border-2 border-primary-dark">
                      <div className="text-black whitespace-pre-wrap">
                        {seniorAdvantagesText}
                      </div>
                    </div>
                  )}
                  {category === 'sauvetage' && (
                    <div className="mb-8 bg-red-50 p-6 rounded-lg border-2 border-red-200">
                      <div className="text-black whitespace-pre-wrap">
                        {sauvetageText}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedAlbums.map((album) => (
                      <motion.div
                        key={album.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        {album.cover_photo && (
                          <div className="relative h-64">
                            <img
                              src={album.cover_photo.source}
                              alt={album.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {album.name}
                          </h3>
                          {album.description && (
                            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{album.description}</p>
                          )}
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{album.count} photos</span>
                            <span>
                              {format(new Date(album.created_time), 'dd MMMM yyyy', { locale: fr })}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {filteredAlbums.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                      <div className="space-y-4">
                        {category === 'chien' && (
                          <>
                            <p className="text-gray-800 text-3xl font-semibold">
                              Actuellement nous n'avons pas de chien à l'adoption
                            </p>
                            <p className="text-gray-600 text-lg">
                              N'hésitez pas à revenir consultez la page plus tard, peut-être que votre bonheur s'y trouveras !
                            </p>
                          </>
                        )}
                        {category === 'chaton' && (
                          <>
                            <p className="text-gray-800 text-3xl font-semibold">
                              Actuellement nous n'avons pas de chaton à l'adoption
                            </p>
                            <p className="text-gray-600 text-lg">
                              N'hésitez pas à revenir consultez la page plus tard, peut-être que votre bonheur s'y trouveras !
                            </p>
                          </>
                        )}
                        {category === 'chat' && (
                          <>
                            <p className="text-gray-800 text-3xl font-semibold">
                              Actuellement nous n'avons pas de chat à l'adoption
                            </p>
                            <p className="text-gray-600 text-lg">
                              N'hésitez pas à revenir consultez la page plus tard, peut-être que votre bonheur s'y trouveras !
                            </p>
                          </>
                        )}
                        {category === 'senior' && (
                          <>
                            <p className="text-gray-800 text-3xl font-semibold">
                              Actuellement nous n'avons pas de senior à l'adoption
                            </p>
                            <p className="text-gray-600 text-lg">
                              N'hésitez pas à revenir consultez la page plus tard, peut-être que votre bonheur s'y trouveras !
                            </p>
                          </>
                        )}
                        {category === 'sauvetage' && (
                          <>
                            <p className="text-gray-800 text-3xl font-semibold">
                              Actuellement nous n'avons pas de sauvetage à l'adoption
                            </p>
                            <p className="text-gray-600 text-lg">
                              N'hésitez pas à revenir consultez la page plus tard, peut-être que votre bonheur s'y trouveras !
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    renderPagination(filteredAlbums.length)
                  )}
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Adoptions;
