import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import SignLanguagePage from './pages/SignLanguagePage';
import FeedbackPage from './pages/FeedbackPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import WelcomePage from './pages/WelcomePage';
import ProtectedLayout from './layouts/ProtectedLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  React.useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/crear-usuario" element={<RegisterPage />} />
        {/* Rutas protegidas con layout */}
        <Route
          element={
            isAuthenticated ? (
              <ProtectedLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/lenguaje-de-senas" element={<SignLanguagePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/cuenta" element={<AccountPage setIsAuthenticated={setIsAuthenticated} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;