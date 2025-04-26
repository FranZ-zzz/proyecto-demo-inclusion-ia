const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Accesibilidad Cultural funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

const corsOptions = { origin: "http://localhost:5173", credentials: true };
app.use(cors(corsOptions));