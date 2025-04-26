import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;