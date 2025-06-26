import React, { useState } from 'react';

const SignLanguagePage = () => {
  const [text, setText] = useState('');

  const renderSigns = () => {
    return text.toLowerCase().split('').map((char, index) => {
      if (/[a-z]/.test(char)) {
        return (
          <img
            key={index}
            src={`/assets/signs/${char}.gif`}
            alt={`Seña de ${char}`}
            className="inline-block mx-1 sign-fade-in"
            style={{ height: 'auto', width: 'auto', maxHeight: '192px', maxWidth: '192px' }} // 4 veces más grande que 48px
          />
        );
      }
      return <span key={index} className="inline-block w-4" />;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 p-8 transition-colors duration-700">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 drop-shadow">Lenguaje de Señas</h2>
      <p className="mb-4 text-gray-700 transition-colors duration-700">
        Aquí puedes encontrar recursos, videos y material educativo sobre el lenguaje de señas.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-shadow duration-500 hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-2 text-purple-700">Recursos destacados</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li className="hover:text-purple-600 transition-colors duration-300">Video: Introducción al lenguaje de señas</li>
          <li className="hover:text-purple-600 transition-colors duration-300">Guía básica de señas para principiantes</li>
          <li className="hover:text-purple-600 transition-colors duration-300">Enlace a diccionario visual de señas</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Traductor a Lengua de Señas</h3>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Entrada de texto */}
          <div className="flex-1 flex flex-col">
            <label className="font-semibold mb-2 text-purple-700">Escribe tu texto:</label>
            <textarea
              className="w-full p-2 border rounded mb-2 min-h-[100px] resize-none focus:ring-2 focus:ring-purple-300 transition-all duration-300"
              placeholder="Escribe un texto"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {/* Traducción a señas */}
          <div className="flex-1 flex flex-col">
            <label className="font-semibold mb-2 text-purple-700">Traducción a señas:</label>
            <div className="flex flex-wrap items-center min-h-[100px] bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded p-2 border transition-all duration-500">
              {renderSigns()}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .sign-fade-in {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
            animation: signFadeIn 0.5s cubic-bezier(.4,0,.2,1) forwards;
          }
          @keyframes signFadeIn {
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignLanguagePage;