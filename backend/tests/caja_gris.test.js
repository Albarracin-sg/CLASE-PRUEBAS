import { jest } from "@jest/globals";
import * as db from "../db.js";

jest.mock("../db.js", () => ({
  ...jest.requireActual("../db.js"),
  connectDB: jest.fn(),
}));

test("caja gris: verifica que connectDB fue llamado", async () => {
  await db.connectDB();
  expect(db.connectDB).toHaveBeenCalled();
});