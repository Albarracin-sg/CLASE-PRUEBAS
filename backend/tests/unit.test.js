import { connectDB, getDB } from "../db.js";

let db;
beforeAll(async () => {
  db = await connectDB();
});

test("la base de datos se conecta correctamente", async () => {
  expect(db).toBeDefined();
});
