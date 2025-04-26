import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState(null);

  // Cargar el modelo Universal Sentence Encoder
  React.useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await use.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Responder al mensaje del usuario
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    if (model) {
      const response = await getBotResponse(input);
      const botMessage = { text: response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    }

    setInput('');
  };

  // Generar respuesta del bot
  const getBotResponse = async (message) => {
    const intents = [
      { intent: 'greeting', examples: ['hello', 'hi', 'hey'], response: '¡Hola! ¿En qué puedo ayudarte?' },
      { intent: 'goodbye', examples: ['bye', 'goodbye', 'see you'], response: '¡Adiós! Que tengas un buen día.' },
      { intent: 'help', examples: ['help', 'support', 'assist'], response: 'Claro, ¿en qué necesitas ayuda?' },
    ];

    // Codificar el mensaje del usuario y los ejemplos
    const userEmbedding = await model.embed([message]);
    const intentEmbeddings = await model.embed(intents.flatMap((intent) => intent.examples));

    // Calcular similitud entre el mensaje del usuario y los ejemplos
    const similarities = tf.matMul(userEmbedding, intentEmbeddings.transpose()).arraySync()[0];
    const maxIndex = similarities.indexOf(Math.max(...similarities));

    // Determinar la intención más cercana
    const intentIndex = Math.floor(maxIndex / intents[0].examples.length);
    return intents[intentIndex]?.response || 'Lo siento, no entiendo tu mensaje.';
  };

  return (
    <div className="chatbot-container bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="chatbot-messages h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-purple-600 text-white self-end' : 'bg-gray-300 text-black self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 p-2 border rounded-l-lg outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chatbot;