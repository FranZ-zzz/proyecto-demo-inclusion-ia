import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoList = ({ videos }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      {videos.map((category) => (
        <div
          key={category.category}
          className="category-section mb-8 border-b-2 border-purple-600 pb-6"
        >
          {/* Título de la Categoría */}
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            {category.category.toUpperCase()}
          </h2>

          {/* Grid de Videos */}
          <div className="video-grid grid grid-cols-5 gap-6">
            {category.videos.slice(0, 5).map((video) => (
              <div
                key={video.id.videoId}
                className="video-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => navigate(`/video/${video.id.videoId}`)}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full h-48 object-cover"
                />
                <div className="info p-4">
                  <p className="text-lg font-semibold text-gray-800 truncate">
                    {video.snippet.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {video.snippet.channelTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;