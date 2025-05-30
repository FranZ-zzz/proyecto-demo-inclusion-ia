import React, { useState } from 'react';
import axios from 'axios';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cambia la URL para usar el proxy backend
  const GEMINI_PROXY_URL = 'http://localhost:4000/api/gemini';

  const handleSend = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setChat((prev) => [...prev, { sender: 'user', text: feedback }]);
    setLoading(true);

    try {
      const response = await axios.post(
        GEMINI_PROXY_URL,
        {
          contents: [
            {
              parts: [
                {
                  text:
                    "Eres un asistente virtual para una plataforma de inclusión cultural enfocada en personas con discapacidad auditiva. Responde de manera empática, clara y útil, considerando siempre la accesibilidad y la importancia de la inclusión."
                },
                { text: feedback }
              ]
            }
          ]
        }
      );
      const botText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No hay respuesta.';
      setChat((prev) => [...prev, { sender: 'bot', text: botText }]);
    } catch (error) {
      setChat((prev) => [...prev, { sender: 'bot', text: 'Error al conectar con Gemini.' }]);
    }
    setFeedback('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Feedback</h2>
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-8">

        <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Tu mensaje</h3>
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Escribe tu mensaje o feedback..."
              className="p-2 border rounded min-h-[100px] resize-none"
              disabled={loading}
            />
            <button
              type="submit"
              className="self-end bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              disabled={loading}
            >
              Enviar
            </button>
          </form>

          <div className="flex flex-col gap-2 mt-4">
            {chat.filter(msg => msg.sender === 'user').map((msg, idx) => (
              <div
                key={idx}
                className="bg-purple-100 text-purple-900 p-2 rounded-lg self-end max-w-[90%] animate-fade-in"
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#e7eafe] via-[#f3e8fd] to-[#e0e7ff] p-6 rounded-lg shadow-md flex flex-col gap-4 border border-[#b39ddb]">
          <h3 className="text-xl font-semibold text-[#5b3cc4] mb-2 flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#7C4DFF"/><path d="M24 12L28.3923 21.6077L39 24L28.3923 26.3923L24 36L19.6077 26.3923L9 24L19.6077 21.6077L24 12Z" fill="#fff"/></svg>
            Gemini
          </h3>
          <div className="flex flex-col gap-2 mt-4">
            {chat.filter(msg => msg.sender === 'bot').map((msg, idx) => (
              <div
                key={idx}
                className="bg-white/80 text-[#3b2e5a] p-3 rounded-lg self-start max-w-[90%] shadow animate-fade-in border border-[#d1c4e9]"
                style={{
                  animation: 'gemini-fade-in 0.7s cubic-bezier(.4,0,.2,1)'
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="bg-white/80 text-[#3b2e5a] p-3 rounded-lg self-start max-w-[90%] shadow border border-[#d1c4e9] animate-pulse">
                Escribiendo...
              </div>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes gemini-fade-in {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: gemini-fade-in 0.7s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </div>
  );
};

export default FeedbackPage;