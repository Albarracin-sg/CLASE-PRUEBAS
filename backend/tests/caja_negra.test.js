import { app } from "../app.js";
import request from "supertest";

test("caja negra: error al crear tarea sin título", async () => {
  const res = await request(app).post("/api/tareas").send({});
  expect(res.status).toBe(400);
});