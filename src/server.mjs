// server.js
import express, { json } from "express";
import router from "./routes/index.mjs";
import cors from "cors";
import dotenv from "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(json());

app.use("/api", router);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
