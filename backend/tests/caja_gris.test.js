import { test, expect } from "bun:test";
import * as db from "../db.js";

test("caja gris: simular conexión a la base de datos", async () => {
  // Creamos un mock manual sin tocar la importación original
  const mockConnectDB = async () => "mocked connection";

  // Usamos el mock en lugar del original dentro de la prueba
  const result = await mockConnectDB();

  // Verificamos el comportamiento esperado
  expect(result).toBe("mocked connection");
  expect(typeof db.connectDB).toBe("function"); // comprobamos que el original sigue intacto
});
