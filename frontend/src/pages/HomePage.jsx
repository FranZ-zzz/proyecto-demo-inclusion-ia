import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon, MusicalNoteIcon, TicketIcon } from '@heroicons/react/24/solid';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const CATEGORIES = [
  { label: 'Cultura', query: 'cultura', icon: <AcademicCapIcon className="h-7 w-7 text-purple-600 inline-block mr-2" /> },
  { label: 'Música', query: 'musica', icon: <MusicalNoteIcon className="h-7 w-7 text-purple-600 inline-block mr-2" /> },
  { label: 'Teatro', query: 'teatro', icon: <TicketIcon className="h-7 w-7 text-purple-600 inline-block mr-2" /> },
];

const HomePage = () => {
  const [videosByCategory, setVideosByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError('');
      const results = {};
      try {
        for (const cat of CATEGORIES) {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${cat.query}&type=video&maxResults=8&key=${YOUTUBE_API_KEY}`
          );
          const data = await response.json();
          console.log('YouTube API response for', cat.label, data);
          if (data.error) {
            setError(data.error.message);
            setLoading(false);
            return;
          }
          results[cat.label] = data.items || [];
        }
        setVideosByCategory(results);
      } catch (err) {
        setError('Error al cargar videos.');
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  return (
    <div className="my-8 space-y-12">
      {CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <h2 className="text-2xl font-bold mb-4 text-purple-700 drop-shadow flex items-center">
            {cat.icon}
            {cat.label}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-4 animate-pulse flex flex-col items-center"
                  >
                    <div className="w-[180px] h-[120px] bg-gray-200 rounded-xl mb-4"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
                  </div>
                ))
              : videosByCategory[cat.label]?.length > 0 ? (
                  videosByCategory[cat.label].map((video, idx) => (
                    <button
                      key={video.id.videoId || idx}
                      onClick={() => navigate(`/video/${video.id.videoId}`)}
                      className="group bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-transparent hover:border-purple-300 cursor-pointer"
                      style={{ minHeight: 240 }}
                    >
                      <div className="relative w-[180px] h-[120px] mb-4 overflow-hidden rounded-xl">
                        <img
                          src={video.snippet.thumbnails.medium.url}
                          alt={video.snippet.title}
                          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow opacity-80 group-hover:opacity-100 transition">Ver</span>
                      </div>
                      <div className="font-semibold text-center text-sm text-gray-800 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                        {video.snippet.title}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-4 text-center text-red-600 font-bold my-8">
                    {error || 'No se encontraron videos.'}
                  </div>
                )}
          </div>
        </div>
      ))}
      <style>
        {`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;