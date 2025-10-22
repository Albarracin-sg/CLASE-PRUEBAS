import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routerTareas from "./routes/tareas.js";
import { connectDB, getDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/tareas", routerTareas);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = 3000;

let server;

(async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();

process.on('SIGINT', async () => {
  console.log('Cerrando la conexión a la base de datos...');
  try {
    const db = getDB();
    if (db) {
      await db.close();
      console.log('Conexión a la base de datos cerrada.');
    }
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error);
  } finally {
    if (server) {
      server.close(() => {
        console.log('Servidor cerrado.');
        process.exit(0);
      });
    }
  }
});

export { app, server };
