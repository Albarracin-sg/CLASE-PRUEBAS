import { test, expect, vi } from "bun:test";
import request from "supertest";
import { app } from "../app.js";
import * as db from "../db.js";

test("caja blanca: error 500 si la base de datos falla", async () => {
  // Espía temporal para simular el error sin sobrescribir la propiedad
  const spy = vi.spyOn(db, "getDB").mockImplementation(() => {
    throw new Error("Fallo simulado en la base de datos");
  });

  const res = await request(app).get("/api/tareas");
  expect(res.status).toBe(500);

  // Restaurar comportamiento original
  spy.mockRestore();
});
