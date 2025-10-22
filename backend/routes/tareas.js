import express from "express";
import { getDB } from "../db.js";

const router = express.Router();

// Crear tarea
router.post("/", async (req, res, next) => {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo) return res.status(400).json({ error: "Título requerido" });
    const db = getDB();
    const result = await db.run("INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)", [titulo, descripcion]);
    const nueva = await db.get("SELECT * FROM tareas WHERE id = ?", [result.lastID]);
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
});

// Listar tareas
router.get("/", async (req, res, next) => {
  try {
    const db = getDB();
    const tareas = await db.all("SELECT * FROM tareas");
    res.json(tareas);
  } catch (error) {
    next(error);
  }
});

// Actualizar tarea
router.put("/:id", async (req, res, next) => {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo) return res.status(400).json({ error: "Título requerido" });
    const db = getDB();
    const tarea = await db.get("SELECT * FROM tareas WHERE id = ?", [req.params.id]);
    if (!tarea) return res.status(404).json({ error: "No encontrada" });
    await db.run("UPDATE tareas SET titulo = ?, descripcion = ? WHERE id = ?", [titulo, descripcion, req.params.id]);
    const actualizada = await db.get("SELECT * FROM tareas WHERE id = ?", [req.params.id]);
    res.json(actualizada);
  } catch (error) {
    next(error);
  }
});

// Marcar como completada
router.put("/:id/completar", async (req, res, next) => {
  try {
    const db = getDB();
    await db.run("UPDATE tareas SET completada = 1 WHERE id = ?", [req.params.id]);
    const tarea = await db.get("SELECT * FROM tareas WHERE id = ?", [req.params.id]);
    if (!tarea) return res.status(404).json({ error: "No encontrada" });
    res.json(tarea);
  } catch (error) {
    next(error);
  }
});

// Eliminar tarea
router.delete("/:id", async (req, res, next) => {
  try {
    const db = getDB();
    const tarea = await db.get("SELECT * FROM tareas WHERE id = ?", [req.params.id]);
    if (!tarea) return res.status(404).json({ error: "No encontrada" });
    await db.run("DELETE FROM tareas WHERE id = ?", [req.params.id]);
    res.json(tarea);
  } catch (error) {
    next(error);
  }
});

export default router;