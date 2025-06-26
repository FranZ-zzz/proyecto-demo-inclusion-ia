import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
    <h1 className="text-4xl font-bold mb-6 text-purple-700">Bienvenido a Plataforma Cultural</h1>
    <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
      Iniciar Sesión
    </Link>
  </div>
);

export default WelcomePage;