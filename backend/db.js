import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

export async function connectDB() {
  db = await open({
    filename: "./tareas.db",
    driver: sqlite3.Database
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    completada INTEGER DEFAULT 0
  )`);

  return db;
}

export function getDB() {
  return db;
}
