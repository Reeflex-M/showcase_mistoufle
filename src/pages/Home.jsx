import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

function Home() {
  const [eventAlbums, setEventAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventAlbums = async () => {
      try {
        console.log('Fetching albums...');
        const response = await axios.get('http://localhost:3001/api/facebook-albums');
        console.log('Response received:', response);
        
        const data = response.data;
        console.log('Albums data:', data);
        
        if (!data || !data.albums) {
          console.error('Invalid data structure:', data);
          return;
        }
        
        const events = data.albums.filter(album => {
          const description = (album.description || '').toLowerCase();
          const name = (album.name || '').toLowerCase();
          return description.includes('#evenement') || 
                 description.includes('#événement') || 
                 description.includes('#évènement') ||
                 name.includes('#evenement') || 
                 name.includes('#événement') || 
                 name.includes('#évènement');
        });
        
        console.log('Filtered events:', events);
        setEventAlbums(events);
      } catch (error) {
        console.error('Error fetching events:', error.message);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventAlbums();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: eventAlbums.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, eventAlbums.length),
    slidesToScroll: 1,
    autoplay: eventAlbums.length > 3,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, eventAlbums.length),
          infinite: eventAlbums.length > 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: eventAlbums.length > 1,
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Accueil</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Événements à venir</h2>
        {loading ? (
          <div className="text-center">Chargement des événements...</div>
        ) : eventAlbums.length > 0 ? (
          <div className="relative">
            <Slider {...sliderSettings}>
              {eventAlbums.map((album) => (
                <div key={album.id} className="px-2">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {album.cover_photo && (
                      <img
                        src={album.cover_photo.source}
                        alt={album.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{album.name}</h3>
                      {album.description && (
                        <p className="text-gray-600 text-sm">
                          {album.description.substring(0, 100)}
                          {album.description.length > 100 ? '...' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Aucun événement à venir pour le moment
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
