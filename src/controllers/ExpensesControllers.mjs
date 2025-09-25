import ExpensesServices from "../helpers/expensesServices.mjs";
import { validationResult } from "express-validator";

class ExpensesControllers {
  async getYears(req, res) {
    try {
      // Получаем года
      const getYears = await ExpensesServices.getYears();

      // Возвращаем массив строк (года)
      res.json(getYears);
    } catch (error) {
      console.error("Ошибка при получении годов:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }

  async getExpenses(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { year, month } = req.query;

      // Проверяем, передан ли год или мес
      if (!year || !month) {
        return res
          .status(400)
          .json({ error: `Параметр ${year || month} обязателен` });
      }

      // Получаем данные по году и месяцу
      const result = await ExpensesServices.getExpenses(year, month);

      // Возвращаем массив объектов
      res.json(result);
    } catch (error) {
      console.error("Ошибка при получении расходов:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }

  async addExpense(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { dateExpnese, expenseCategory, description, price } = req.body;

      // Добавляем расход
      await ExpensesServices.addExpense(
        dateExpnese,
        expenseCategory,
        description,
        price
      );

      // Отправляем, что всё добавлено
      res.json("Добавлено!");
      // res.status(200);
    } catch (error) {
      console.error("Ошибка при добавлении расхода:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }

  async deleteExpense(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id, year, month, date } = req.query;

      await ExpensesServices.deleteExpense(id, year, month, date);

      res.json("Удалили!");
    } catch (error) {
      console.error("Ошибка при удалении расхода:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }
}

export default new ExpensesControllers();
