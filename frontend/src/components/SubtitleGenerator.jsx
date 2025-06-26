import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const SubtitleGenerator = () => {
  const [model, setModel] = useState(null);
  const [audioInput, setAudioInput] = useState(null);
  const [subtitles, setSubtitles] = useState('');

  // Cargar el modelo preentrenado al montar el componente
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/path/to/model.json'); // Cambia la ruta al modelo
        setModel(loadedModel);
        console.log('Modelo cargado correctamente');
      } catch (error) {
        console.error('Error al cargar el modelo:', error);
      }
    };
    loadModel();
  }, []);

  // Función para manejar la carga de archivos de audio
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioInput(file);
    }
  };

  // Función para generar subtítulos
  const generateSubtitles = async () => {
    if (!model || !audioInput) {
      alert('Por favor, carga un archivo de audio y espera a que el modelo se cargue.');
      return;
    }

    try {
      // Convierte el archivo de audio en un tensor (esto es solo un ejemplo, necesitarás preprocesar el audio correctamente)
      const audioData = await audioInput.arrayBuffer();
      const audioTensor = tf.tensor(new Float32Array(audioData), [1, audioData.byteLength]);

      // Genera subtítulos usando el modelo
      const predictions = model.predict(audioTensor);
      const generatedSubtitles = predictions.dataSync(); // Obtén los resultados como texto

      setSubtitles(generatedSubtitles.toString());
    } catch (error) {
      console.error('Error al generar subtítulos:', error);
    }
  };

  return (
    <div>
      <h1>Generador de Subtítulos Automáticos</h1>
      <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      <button onClick={generateSubtitles}>Generar Subtítulos</button>
      <div>
        <h2>Subtítulos Generados:</h2>
        <p>{subtitles}</p>
      </div>
    </div>
  );
};

export default SubtitleGenerator;