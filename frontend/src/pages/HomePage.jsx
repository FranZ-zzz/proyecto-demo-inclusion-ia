import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from '../components/VideoList';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      const categories = ['arte', 'musica', 'danzas'];
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const videoData = [];

      for (const category of categories) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&type=video&key=${apiKey}`
        );
        videoData.push({ category, videos: response.data.items });
      }

      const initialVisibleVideos = {};
      videoData.forEach((category) => {
        initialVisibleVideos[category.category] = 4; // Inicialmente muestra 4 videos
      });

      setVideos(videoData);
      setVisibleVideos(initialVisibleVideos);
    };

    fetchVideos();
  }, []);

  const handleSearch = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${apiKey}`
    );
    setVideos([{ category: 'Resultados de búsqueda', videos: response.data.items }]);
    setVisibleVideos({ 'Resultados de búsqueda': 4 }); // Reinicia el contador para la búsqueda
  };

  const showMoreVideos = (category) => {
    setVisibleVideos((prev) => ({
      ...prev,
      [category]: prev[category] + 4, // Incrementa en 4 videos
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-bold">Plataforma Cultural</h1>
        <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 w-full outline-none text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
          >
            Buscar
          </button>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <VideoList
          videos={videos}
          visibleVideos={visibleVideos}
          showMoreVideos={showMoreVideos}
        />
      </div>
    </div>
  );
};

export default HomePage;