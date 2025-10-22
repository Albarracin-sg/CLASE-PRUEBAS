import { app } from "../app.js";
import { test, expect, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import { connectDB } from "../db.js";

let server;

beforeAll(async () => {
  await connectDB();
  server = app.listen(0); // puerto aleatorio
});

afterAll((done) => {
  server.close(done);
});

test("flujo completo de tareas", async () => {
  const tarea = await request(app)
    .post("/api/tareas")
    .send({ titulo: "Flujo", descripcion: "prueba flujo" });

  const res = await request(app).get("/api/tareas");
  expect(res.body.find(t => t.titulo === "Flujo")).toBeTruthy();
});
