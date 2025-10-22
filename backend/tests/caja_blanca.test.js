import { jest } from "@jest/globals";
import { app } from "../app.js";
import request from "supertest";

test("caja blanca: error 500 si la base de datos falla", async () => {
  jest.unstable_mockModule("../db.js", () => ({
    getDB: jest.fn(() => {
      throw new Error("Fallo de base de datos simulado");
    }),
  }));

  const { getDB } = await import("../db.js");

  const res = await request(app).get("/api/tareas");
  expect(res.status).toBe(500);
  expect(res.body.error).toBe("Fallo de base de datos simulado");
});