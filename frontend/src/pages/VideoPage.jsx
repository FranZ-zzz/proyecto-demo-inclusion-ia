import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubtitleGenerator from '../components/SubtitleGenerator';

const VideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [subtitles, setSubtitles] = useState('');

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
          <SubtitleGenerator setSubtitles={setSubtitles} />
          <div className="mt-4">
            <p className="text-gray-700">{subtitles || 'Cargando subtítulos...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;