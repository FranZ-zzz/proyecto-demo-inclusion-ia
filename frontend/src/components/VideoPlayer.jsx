import React, { useState } from 'react';
import SubtitleGenerator from './SubtitleGenerator';

const VideoPlayer = ({ video }) => {
  const [subtitles, setSubtitles] = useState('');

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">{video.snippet.title}</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        title={video.snippet.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <SubtitleGenerator setSubtitles={setSubtitles} />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Subtítulos Generados:</h3>
        <p>{subtitles}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;