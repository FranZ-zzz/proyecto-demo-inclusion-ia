import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica real para guardar el usuario
    setCreated(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
      <form onSubmit={handleCreate} className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Crear Usuario</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Crear Cuenta
        </button>
        {created && <span className="text-green-600">¡Usuario creado con éxito!</span>}
      </form>
    </div>
  );
};

export default RegisterPage;
