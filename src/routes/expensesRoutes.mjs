import express from "express";

import ExpensesControllers from "../controllers/ExpensesControllers.mjs";
import { authenticateToken } from "../middleware/authenticateToken.mjs";

import {
  validateData,
  validateDeleteRequest,
  validateBody,
} from "../validators/expensesValidator.mjs";

const router = express.Router();

// GET /api/expenses/getYears

/**
 * @swagger
 * /api/expenses/getYears:
 *    get:
 *      summary: Получить года
 *      description: Получить годы которые пользователь вносил расходы
 *      tags:
 *        - Expenses
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: Успех
 */

router.get("/getYears", authenticateToken, ExpensesControllers.getYears);

// GET /api/expenses/getExpenses?year=2025&month={month}

/**
 * @swagger
 * /api/expenses/getExpenses:
 *   get:
 *     summary: Получить расходы
 *     description: Получить расходы по году и месяцу
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *         example: 2025
 *         description: Год, за который получить расходы
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         example: Сентябрь
 *         description: Месяц, за который получить расходы
 *     responses:
 *       200:
 *         description: Успех
 */

router.get(
  "/getExpenses",
  authenticateToken,
  validateData,
  ExpensesControllers.getExpenses
);

// POST /api/expenses/addExpense

/**
 * @swagger
 * /api/expenses/addExpense:
 *    post:
 *      summary: Добавить расход
 *      description: Добавить расход
 *      tags:
 *        - Expenses
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/ExpensesaddExpense"
 *      responses:
 *        200:
 *          description: Расход добавлен!
 * components:
 *   requestBodies:
 *     ExpensesaddExpense:
 *       description: Добавление расхода
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateExpnese:
 *                 type: string
 *                 example: 25.09.2025
 *                 description: Дата расхода
 *               expenseCategory:
 *                 type: string
 *                 example: Еда
 *                 description: Категория расхода
 *               description:
 *                 type: string
 *                 example: Молоко, кефир
 *                 description: Описание трат
 *               price:
 *                 type: number
 *                 example: 2100
 *                 description: Цена
 */

router.post(
  "/addExpense",
  authenticateToken,
  validateBody,
  ExpensesControllers.addExpense
);

// DELETE /api/expenses/deleteExpense?id={id}&year=2025&month={month}&date={date}

/**
 * @swagger
 * /api/expenses/deleteExpense:
 *    delete:
 *      summary: Удалить расход
 *      description: Удалить расход
 *      tags:
 *        - Expenses
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 13rresfd5trrg345tsfd
 *         description: id расхода
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *         example: 2025
 *         description: год расхода
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         example: Сентябрь
 *         description: месяц расхода
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         example: 25.09
 *         description: день расхода
 *      responses:
 *        200:
 *          description: Успешное удаление таски
 *        404:
 *          description: Таска с указанным идентификатором не найдена.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.delete(
  "/deleteExpense",
  authenticateToken,
  validateDeleteRequest,
  validateData,
  ExpensesControllers.deleteExpense
);

export default router;
