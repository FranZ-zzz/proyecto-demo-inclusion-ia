import React from 'react';

const SignLanguagePage = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h2 className="text-3xl font-bold text-purple-700 mb-6">Lenguaje de Señas</h2>
    <p className="mb-4">
      Aquí puedes encontrar recursos, videos y material educativo sobre el lenguaje de señas.
    </p>
    {/* Aquí puedes agregar videos, enlaces o recursos */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Recursos destacados</h3>
      <ul className="list-disc ml-6">
        <li>Video: Introducción al lenguaje de señas</li>
        <li>Guía básica de señas para principiantes</li>
        <li>Enlace a diccionario visual de señas</li>
      </ul>
    </div>
  </div>
);

export default SignLanguagePage;