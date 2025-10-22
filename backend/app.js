import express from "express";
import cors from "cors";
import path from "path";
import routerTareas from "./routes/tareas.js";

const projectRoot = process.cwd();
const frontendPath = path.join(projectRoot, "frontend");

const app = express();
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(frontendPath));
app.use("/api/tareas", routerTareas);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export { app };
