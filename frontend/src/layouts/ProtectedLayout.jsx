import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  HandRaisedIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';

const ProtectedLayout = ({ setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadedSubtitles, setUploadedSubtitles] = useState('');
  const [subtitlesLoading, setSubtitlesLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      const categories = ['arte', 'musica', 'danzas'];
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const videoData = [];

      for (const category of categories) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&type=video&maxResults=8&key=${apiKey}`
        );
        videoData.push({ category, videos: response.data.items });
      }

      const initialVisibleVideos = {};
      videoData.forEach((category) => {
        initialVisibleVideos[category.category] = 4;
      });

      setVideos(videoData);
      setVisibleVideos(initialVisibleVideos);
    };

    fetchVideos();
  }, []);

  const handleSearch = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&maxResults=8&key=${apiKey}`
    );
    setVideos([{ category: 'Resultados de búsqueda', videos: response.data.items }]);
    setVisibleVideos({ 'Resultados de búsqueda': 4 });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setSubtitlesLoading(true);
      setUploadedSubtitles('');
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedSubtitles(response.data.subtitles);
      alert('Subtítulos generados con éxito.');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('No se pudieron generar los subtítulos.');
    } finally {
      setSubtitlesLoading(false);
    }
  };

  const handleDownloadSubtitles = () => {
    const element = document.createElement('a');
    const file = new Blob([uploadedSubtitles], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'subtitulos.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const showMoreVideos = (category) => {
    setVisibleVideos((prev) => ({
      ...prev,
      [category]: prev[category] + 4,
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/');
  };

  const showSearchAndUpload = location.pathname === '/home';

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button
            className="mr-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <Bars3Icon className="h-8 w-8 text-white" />
          </button>
          <h1 className="text-2xl font-bold">Plataforma Cultural</h1>
        </div>
        {showSearchAndUpload && (
          <div className="flex items-center gap-4">
            {/* Botón Subir Multimedia */}
            <label className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105 cursor-pointer">
              Subir Multimedia
              <input
                type="file"
                accept="video/*,audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {/* Mostrar subtítulos generados */}
            {subtitlesLoading && (
              <span className="ml-2 text-yellow-200 animate-pulse">Generando subtítulos...</span>
            )}
            {uploadedSubtitles && !subtitlesLoading && (
              <span className="ml-2 flex items-center gap-2 bg-white text-purple-700 px-3 py-1 rounded shadow">
                {uploadedSubtitles}
                <button
                  onClick={handleDownloadSubtitles}
                  className="ml-2 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition"
                  title="Descargar subtítulos"
                >
                  Descargar .txt
                </button>
              </span>
            )}
            {/* Cuadro de Búsqueda */}
            <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 flex-1">
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
          </div>
        )}
      </header>

      {/* Menú lateral */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="bg-white text-purple-700 w-64 h-full shadow-lg flex flex-col p-6 animate-fade-in">
            <button
              className="self-end mb-6"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <XMarkIcon className="h-7 w-7 text-purple-700" />
            </button>
            <nav className="flex flex-col gap-6">
              <a href="/home" className="flex items-center gap-3 hover:text-purple-500 transition-colors">
                <HomeIcon className="h-6 w-6" /> Casa
              </a>
              <a href="/lenguaje-de-senas" className="flex items-center gap-3 hover:text-purple-500 transition-colors">
                <HandRaisedIcon className="h-6 w-6" /> Lenguaje de señas
              </a>
              <a href="/feedback" className="flex items-center gap-3 hover:text-purple-500 transition-colors">
                <ChatBubbleLeftRightIcon className="h-6 w-6" /> Feedback
              </a>
              <a href="/cuenta" className="flex items-center gap-3 hover:text-purple-500 transition-colors">
                <UserCircleIcon className="h-6 w-6" /> Cuenta
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 hover:text-purple-500 transition-colors text-left"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" /> Logout
              </button>
            </nav>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      <main className="container mx-auto p-4">
        {/* Pasa props solo a HomePage */}
        {location.pathname === '/home' ? (
          <Outlet
            context={{
              searchTerm,
              setSearchTerm,
              handleSearch,
              handleFileUpload,
              uploadedSubtitles,
              videos,
              visibleVideos,
              showMoreVideos,
            }}
          />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default ProtectedLayout;