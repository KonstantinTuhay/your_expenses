// ./swaggerSpec.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "GET, POST, DELETE",
      version: "1.0.0",
      description: "API документация для приложения",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["./routes/*.mjs"],
};

export const swaggerSpec = swaggerJSDoc(options);
