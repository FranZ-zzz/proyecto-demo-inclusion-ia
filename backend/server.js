const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No se subió ningún archivo.' });
  }

  try {
    const subtitles = `Subtítulos generados para el archivo: ${file.originalname}`;
    res.json({ subtitles });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ error: 'No se pudieron generar los subtítulos.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));