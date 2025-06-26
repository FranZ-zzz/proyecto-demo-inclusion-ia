const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// AssemblyAI API config
const ASSEMBLYAI_API_KEY = 'd661efaf8f994ca6b5c09b726fed245d';
const baseUrl = "https://api.assemblyai.com";
const headers = {
  authorization: ASSEMBLYAI_API_KEY,
};

// Transcription endpoint using AssemblyAI
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No se subió ningún archivo.' });
  }

  try {
    // 1. Leer el archivo subido
    const audioData = await fs.readFile(file.path);

    // 2. Subir el archivo a AssemblyAI
    const uploadResponse = await axios.post(`${baseUrl}/v2/upload`, audioData, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    const audioUrl = uploadResponse.data.upload_url;

    // 3. Solicitar la transcripción
    const data = {
      audio_url: audioUrl,
      speech_model: "universal",
    };
    const transcriptResponse = await axios.post(`${baseUrl}/v2/transcript`, data, { headers });
    const transcriptId = transcriptResponse.data.id;
    const pollingEndpoint = `${baseUrl}/v2/transcript/${transcriptId}`;

    // 4. Esperar a que la transcripción esté lista
    let transcriptionResult;
    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, { headers });
      transcriptionResult = pollingResponse.data;

      if (transcriptionResult.status === "completed") {
        break;
      } else if (transcriptionResult.status === "error") {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    // 5. Eliminar el archivo temporal
    await fs.unlink(file.path);

    // 6. Responder con la transcripción
    res.json({ subtitles: transcriptionResult.text });
  } catch (error) {
    console.error('Error al procesar el archivo:', error.message || error);
    res.status(500).json({ error: 'No se pudieron generar los subtítulos.' });
  }
});

const RAPIDAPI_KEY = 'cf112593e9msh9641a1508401f11p121bb3jsn03cb5654c79a';

app.get('/api/rapidapi/suggestions', async (req, res) => {
  const { q = 'arte' } = req.query;
  try {
    const response = await axios.get('https://youtube138.p.rapidapi.com/auto-complete/', {
      params: { q, hl: 'en', gl: 'US' },
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'youtube138.p.rapidapi.com'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo conectar con la API de RapidAPI.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));