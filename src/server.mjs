// server.js
import express, { json } from "express";
import router from "./routes/index.mjs";
import cors from "cors";
import dotenv from "dotenv/config";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerSpec.mjs";

const app = express();
const PORT = process.env.PORT || 3001;

// Определяем маршрут для Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(json());

app.use("/api", router);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
