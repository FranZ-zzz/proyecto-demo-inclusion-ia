import React from 'react';
import VideoList from '../components/VideoList';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const {
    uploadedSubtitles,
    videos,
    visibleVideos,
    showMoreVideos,
  } = useOutletContext();

  return (
    <div>
      <VideoList
        videos={videos}
        visibleVideos={visibleVideos}
        showMoreVideos={showMoreVideos}
      />
      {uploadedSubtitles && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Subtítulos Generados</h2>
          <p className="text-gray-700">{uploadedSubtitles}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;