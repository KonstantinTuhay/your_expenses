import { app } from "./app.mjs";

const PORT = process.env.PORT || 3001;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
