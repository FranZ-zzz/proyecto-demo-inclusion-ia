import React, { useState } from 'react';

const FEEDBACK_API_URL = 'https://open-ai21.p.rapidapi.com/conversationllama';
const RAPIDAPI_KEY = '6bce462c35mshb4800de57059215p1d3133jsn47bcc5a6b9e9';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setChat((prev) => [...prev, { sender: 'user', text: feedback }]);
    setLoading(true);

    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: 'POST',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content:
                'Eres un experto en inclusión cultural para personas con discapacidad auditiva. Responde en español de manera clara, empática y profesional, brindando orientación y sugerencias útiles sobre accesibilidad, cultura y participación inclusiva.'
            },
            {
              role: 'user',
              content: feedback
            }
          ],
          web_access: false
        })
      });
      const result = await response.json();
      const botText = result.result || 'No hay respuesta.';
      setChat((prev) => [...prev, { sender: 'bot', text: botText }]);
    } catch (error) {
      setChat((prev) => [...prev, { sender: 'bot', text: 'Error al conectar con el asistente.' }]);
    }
    setFeedback('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Feedback</h2>
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-8">
        {/* Contenedor de Feedback (izquierda) */}
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
          {/* Historial de mensajes del usuario */}
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
        {/* Contenedor de Respuesta (derecha) */}
        <div className="flex-1 bg-gradient-to-br from-[#e7eafe] via-[#f3e8fd] to-[#e0e7ff] p-6 rounded-lg shadow-md flex flex-col gap-4 border border-[#b39ddb]">
          <h3 className="text-xl font-semibold text-[#5b3cc4] mb-2">Asistente</h3>
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