import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6 animate-fade-in">Bienvenido a la Plataforma Cultural</h1>
      <p className="text-lg mb-8">Explora videos culturales adaptados para todos.</p>
      <button
        onClick={() => navigate('/home')}
        className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
      >
        Entrar
      </button>
    </div>
  );
};

export default WelcomePage;