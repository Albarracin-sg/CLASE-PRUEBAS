import { app, server } from "../app.js";
import { connectDB } from "../db.js";
import request from "supertest";

beforeAll(async () => await connectDB());

afterAll((done) => {
  server.close(done);
});

test("crear y listar tareas", async () => {
  await request(app).post("/api/tareas").send({ titulo: "Estudiar Jest", descripcion: "Clase práctica" });
  const res = await request(app).get("/api/tareas");
  expect(res.body.length).toBeGreaterThan(0);
});