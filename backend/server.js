import { app } from "./app.js";
import { connectDB, getDB } from "./db.js";

const PORT = process.env.PORT || 3000;
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
