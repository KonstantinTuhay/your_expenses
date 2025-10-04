import express, { json } from "express";
import router from "./routes/index.mjs";
import cors from "cors";
import dotenv from "dotenv/config";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerSpec.mjs";

import * as Sentry from "@sentry/node";
// const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://df24018d5bc0ac578d104df5f12703c9@o4510126530035712.ingest.de.sentry.io/4510126561165392",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

export const app = express();
Sentry.setupExpressErrorHandler(app);

// Определяем маршрут для Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(json());

app.use("/api", router);
