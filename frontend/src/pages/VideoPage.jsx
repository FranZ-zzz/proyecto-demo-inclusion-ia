import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [subtitles, setSubtitles] = useState('');

  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-subtitles?videoId=${videoId}`);
        const transcript = response.data.map((item) => item.text).join(' ');
        setSubtitles(transcript);
      } catch (error) {
        console.error('Error al obtener los subtítulos:', error);
        setSubtitles('No se pudieron cargar los subtítulos.');
      }
    };

    fetchSubtitles();
  }, [videoId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-bold">Plataforma Cultural</h1>
        <button
          onClick={() => navigate('/home')}
          className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
        >
          Volver al Inicio
        </button>
      </header>
      <div className="flex flex-col md:flex-row p-6 gap-6">
        <div className="flex-1">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Subtítulos Generados</h2>
          <div className="mt-4">
            <p className="text-gray-700">{subtitles || 'Cargando subtítulos...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;