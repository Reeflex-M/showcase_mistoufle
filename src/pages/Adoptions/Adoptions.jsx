import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';
import { PiCatFill } from 'react-icons/pi';
import { GiSittingDog, GiCat } from 'react-icons/gi';
import { Tab } from "@headlessui/react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
  const [chatonPhotos, setChatonPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("chien");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbumPhotos, setSelectedAlbumPhotos] = useState([]);

  const categories = {
    chien: {
      name: "Chiens",
      icon: <FaDog className="w-6 h-6" />,
      color: "primary",
      hashtag: "#chien"
    },
    chaton: {
      name: "Chatons",
      icon: <FaPaw className="w-6 h-6" />,
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
      icon: <GiCat className="w-6 h-6 text-white" />,
      color: "urgent",
      urgentColor: "bg-primary-dark/80",
      hashtag: "#senior"
    },
    sauvetage: {
      name: "Sauvetages",
      icon: (
        <div className="flex items-center space-x-1">
          <FaDog className="w-6 h-6 text-white" />
          <span className="text-white font-bold">/</span>
          <FaCat className="w-6 h-6 text-white" />
        </div>
      ),
      color: "urgent",
      urgentColor: "from-red-600 to-rose-600",
      hashtag: "#sauvetage"
    }
  };

  const seniorAdvantagesText = `Toute adoption de chat senior entre dans le cadre du dispositif "Opération doyens" financée par notre partenaire 30 Millions d'amis ! 

Cela veut dire qu'en cas d'adoption d'un chat dit âgé (à partir de 10 ans) au sein de notre refuge, l'adoption est en don libre (un minimum de 50 euros est demandé), cela permet également via cette opération, de bénéficier d'un soutien financier pour les frais vétérinaires après l'adoption à hauteur de 800 euros maximum (ce montant sera réglé en une ou plusieurs fois au vétérinaire sur sa(ses) facture(s) détaillée(s) et non réglée(s)).
`;

  const sauvetageText = `Nos sauvetages sont des chats ou des chiens qui ont souvent eu un parcours de vie difficile. Venir au refuge chaque semaine pour la journée adoptions est une épreuve de plus pour eux.

De par leur pathologie, leur âge ou leur handicap ils n'intéressent que peu d adoptants. Ils ont pourtant beaucoup d'amour à donner`;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-albums`);
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        setAlbums(data.albums);

        // Trouver l'album des chatons par son nom exact
        const chatonAlbum = data.albums.find(album => 
          album.name === "Nos chatons à l'adoption !"
        );
        
        console.log('Album chatons trouvé:', chatonAlbum);
        
        if (chatonAlbum) {
          const photosResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-album-photos/${chatonAlbum.id}`);
          if (photosResponse.ok) {
            const photosData = await photosResponse.json();
            console.log('Photos des chatons:', photosData);
            setChatonPhotos(photosData.photos);
          } else {
            console.error('Erreur lors de la récupération des photos:', await photosResponse.text());
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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

  const handleAlbumClick = async (album) => {
    try {
      setSelectedAnimal(album);
      setIsModalOpen(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-album-photos/${album.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch album photos');
      }
      const data = await response.json();
      setSelectedAlbumPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching album photos:', error);
    }
  };

  const renderContent = (category) => {
    if (category === 'chaton') {
      console.log('Rendu des chatons, nombre de photos:', chatonPhotos.length);
      const paginatedPhotos = chatonPhotos.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

      if (chatonPhotos.length === 0) {
        return (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="space-y-4">
              <p className="text-gray-800 text-3xl font-semibold">
                Actuellement nous n'avons pas de chaton à l'adoption
              </p>
              <p className="text-gray-600 text-lg">
                N'hésitez pas à revenir consulter la page plus tard, peut-être que votre bonheur s'y trouvera !
              </p>
            </div>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <img
                  src={photo.source}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-600 mb-4 whitespace-pre-wrap leading-relaxed">
                  {photo.name.split('\\n').join('\n')}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  <span className="flex items-center">
                    <FaPaw className="w-4 h-4 mr-2 text-primary-dark" />
                    Chaton à l'adoption
                  </span>
                  <span>
                    {format(new Date(photo.created_time), 'dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    const filteredAlbums = filterAlbumsByCategory(category);
    const paginatedAlbums = getPaginatedAlbums(filteredAlbums);

    if (filteredAlbums.length === 0) {
      const categoryInfo = categories[category];
      return (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="space-y-4">
            <p className="text-gray-800 text-3xl font-semibold">
              Actuellement nous n'avons pas {category === 'chien' ? 'de chien' : 
                category === 'chat' ? 'de chat' : 
                category === 'senior' ? 'de senior' : 
                'de sauvetage'} à l'adoption
            </p>
            <p className="text-gray-600 text-lg">
              N'hésitez pas à revenir consulter la page plus tard, peut-être que votre bonheur s'y trouvera !
            </p>
          </div>
        </div>
      );
    }

    return (
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
              <div 
                className="relative h-64 cursor-pointer group"
                onClick={() => handleAlbumClick(album)}
              >
                <img
                  src={album.cover_photo.source}
                  alt={album.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-gray-800 font-medium">Voir toutes les photos</span>
                  </div>
                </div>
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
            {Object.keys(categories).map((category) => (
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
                {renderContent(category)}
                {renderPagination(
                  category === 'chaton' 
                    ? chatonPhotos.length 
                    : filterAlbumsByCategory(category).length
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      
      {/* Photo Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAlbumPhotos([]);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-xl p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">
                {selectedAnimal?.name || 'Photos de l\'animal'}
              </Dialog.Title>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedAlbumPhotos([]);
                }}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedAlbumPhotos.map((photo, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={photo.source}
                    alt={photo.name || `Photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Adoptions;
