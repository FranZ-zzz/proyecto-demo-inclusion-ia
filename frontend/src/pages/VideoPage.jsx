import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const VideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideoInfo(data.items[0]);
        }
      } catch (err) {
        setVideoInfo(null);
      }
      setLoading(false);
    };
    fetchVideoInfo();
  }, [videoId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row p-6 gap-6">
        <div className="flex-[2]">
          <iframe
            width="100%"
            height="540"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4 text-purple-700">Información del Video</h2>
          {loading ? (
            <p className="text-gray-500">Cargando información...</p>
          ) : videoInfo ? (
            <>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Título:</span> {videoInfo.snippet.title}
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Canal:</span> {videoInfo.snippet.channelTitle}
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Publicado:</span> {new Date(videoInfo.snippet.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Vistas:</span> {videoInfo.statistics.viewCount}
              </p>
              <p className="text-gray-700 mt-4 whitespace-pre-line">
                {videoInfo.snippet.description}
              </p>
              <button
                onClick={() => navigate('/home')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Volver al Inicio
              </button>
            </>
          ) : (
            <p className="text-red-600">No se pudo cargar la información del video.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;