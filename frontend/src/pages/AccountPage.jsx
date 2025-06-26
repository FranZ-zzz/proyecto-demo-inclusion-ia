import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, ChartBarIcon } from '@heroicons/react/24/solid';

// Función para generar datos simulados aleatorios
const generateSimulatedStats = () => {
  const terms = ['arte', 'música', 'danzas', 'teatro', 'pintura', 'escultura', 'cine', 'fotografía'];
  return terms
    .map(term => ({
      term,
      freq: Math.floor(Math.random() * 20) + 1,
    }))
    .sort((a, b) => b.freq - a.freq);
};

// Simula datos de búsquedas por día para el gráfico
const generateSearchOverTime = () => {
  const days = 7;
  const today = new Date();
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      count: Math.floor(Math.random() * 10) + 1,
    };
  });
};

const AccountPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [searchStats, setSearchStats] = useState([]);
  const [searchOverTime, setSearchOverTime] = useState([]);

  // Randomiza los datos cada vez que se recarga la página
  useEffect(() => {
    setSearchStats(generateSimulatedStats());
    setSearchOverTime(generateSearchOverTime());
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/');
  };

  // Gráfico simple con SVG
  const maxCount = Math.max(...searchOverTime.map(d => d.count), 10);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <UserCircleIcon className="h-24 w-24 text-purple-600 mb-4" />
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Mi Cuenta </h2>
        <p className="mb-4">Aqui se mostraran los datos de busquedas del usuario.</p>
        <div className="mb-6">
          <p><strong>Usuario:</strong> USUARIO</p>
          <p><strong>Email:</strong> usuario@email.com</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard de búsquedas simuladas */}
      <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <ChartBarIcon className="h-7 w-7 text-purple-600" />
          <h3 className="text-xl font-bold text-purple-700">Dashboard de Búsquedas</h3>
        </div>
        {searchStats.length === 0 ? (
          <p className="text-gray-500">Aún no hay búsquedas registradas.</p>
        ) : (
          <>
            <ul className="mb-4">
              {searchStats.map(({ term, freq }, idx) => (
                <li
                  key={term}
                  className="flex justify-between items-center border-b border-purple-100 py-2 px-2 rounded hover:bg-purple-50 transition"
                >
                  <span className="font-medium text-purple-900">{idx + 1}. {term}</span>
                  <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full font-bold shadow">{freq}</span>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="font-semibold mb-2">
                Búsquedas por día (última semana)
              </h4>
              <div className="w-full flex flex-col items-center">
                <svg width="100%" height="160" viewBox="0 0 320 160" className="mb-2">
                  {/* Ejes */}
                  <line x1="30" y1="10" x2="30" y2="140" stroke="#b39ddb" strokeWidth="2" />
                  <line x1="30" y1="140" x2="310" y2="140" stroke="#b39ddb" strokeWidth="2" />
                  {/* Líneas y puntos */}
                  {searchOverTime.map((d, i, arr) => {
                    if (i === 0) return null;
                    const prev = arr[i - 1];
                    const x1 = 30 + ((i - 1) * 40);
                    const y1 = 140 - (prev.count / maxCount) * 120;
                    const x2 = 30 + (i * 40);
                    const y2 = 140 - (d.count / maxCount) * 120;
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#7c4dff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    );
                  })}
                  {searchOverTime.map((d, i) => {
                    const x = 30 + (i * 40);
                    const y = 140 - (d.count / maxCount) * 120;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="6" fill="#7c4dff" />
                        <text x={x} y={y - 12} fontSize="12" fill="#7c4dff" textAnchor="middle" fontWeight="bold">{d.count}</text>
                        <text x={x} y={155} fontSize="12" fill="#5b3cc4" textAnchor="middle">{d.date}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </>
        )}
        <div className="mt-4 flex justify-center">
          <span className="text-sm text-gray-500 italic">* Datos para demostración</span>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;