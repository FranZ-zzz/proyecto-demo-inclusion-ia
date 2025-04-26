import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

// Configura la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,       // Usuario de la base de datos
  host: process.env.DB_HOST,       // Host de la base de datos
  database: process.env.DB_NAME,   // Nombre de la base de datos
  password: process.env.DB_PASS,   // Contraseña del usuario
  port: process.env.DB_PORT,       // Puerto de PostgreSQL (por defecto 5432)
});

export default pool;