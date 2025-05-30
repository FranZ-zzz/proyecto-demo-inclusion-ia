import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const AccountPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <UserCircleIcon className="h-24 w-24 text-purple-600 mb-4" />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Mi Cuenta</h2>
        <p className="mb-4">Aquí puedes ver y editar los datos de tu cuenta.</p>
        <div className="mb-6">
          <p><strong>Usuario:</strong> usuario_demo</p>
          <p><strong>Email:</strong> usuario@demo.com</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;