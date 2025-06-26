import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica real de autenticación
    if (user && pass) {
      setIsAuthenticated(true);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Entrar
        </button>
        <button
          type="button"
          className="bg-gray-300 text-purple-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={() => navigate('/crear-usuario')}
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default LoginPage;