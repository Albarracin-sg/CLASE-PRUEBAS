import { app, server } from "../app.js";
import { connectDB } from "../db.js";
import request from "supertest";

beforeAll(async () => await connectDB());

afterAll((done) => {
  server.close(done);
});

test("flujo completo: crear, completar y eliminar tarea", async () => {
  const nueva = await request(app).post("/api/tareas").send({ titulo: "Flujo", descripcion: "Completa" });
  const id = nueva.body.id;
  await request(app).put(`/api/tareas/${id}/completar`);
  await request(app).delete(`/api/tareas/${id}`);
  const res = await request(app).get("/api/tareas");
  expect(res.body.find(t => t.id === id)).toBeUndefined();
});