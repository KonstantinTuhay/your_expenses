import express from "express";

import ExpensesControllers from "../controllers/ExpensesControllers.mjs";
import UsersControllers from "../controllers/UsersControllers.mjs";
import { authenticateToken } from "../middleware/authenticateToken.mjs";

import {
  validateData,
  validateDeleteRequest,
  validateBody,
} from "../validators/expensesValidator.mjs";

import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateRegister,
  validateLogin,
} from "../validators/authValidate.mjs";

const router = express.Router();

// POST /api/expenses/login

/**
 * @openapi
 * /api/expenses/login:
 *    post:
 *      summary: Логин пользователя
 *      description: Чтобы залогиниться пользователю
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Успешный вход
 * components:
 *   requestBodies:
 *     Users:
 *       description: Все возможности для пользователей.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@mail.ru
 *                 description: email пользователя
 *               password:
 *                 type: string
 *                 example: ******
 *                 description: Пароль пользователя
 */

router.post("/login", validateEmail, validatePassword, UsersControllers.login);

// POST /api/expenses/register

/**
 * @openapi
 * /api/expenses/register:
 *    post:
 *      summary: Зарегистрировать пользователя
 *      description: Регистрация пользователя
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь зарегистрирован
 * components:
 *   requestBodies:
 *     Users:
 *       description: Регистрация пользователя
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@mail.ru
 *                 description: email пользователя
 *               password:
 *                 type: string
 *                 example: ******
 *                 description: Пароль пользователя
 *               firstName:
 *                 type: string
 *                 example: Андрей
 *                 description: Имя пользователя
 */

router.post(
  "/register",
  validateEmail,
  validatePassword,
  validateFirstName,
  UsersControllers.register
);

// GET /api/expenses/getYears

/**
 * @openapi
 * /api/expenses/getYears:
 *    get:
 *      summary: Получить годы
 *      description: Получить годы которые пользователь вносил расходы
 *      tags:
 *        - Expenses
 *      responses:
 *        200:
 *          description: Успех
 */

router.get("/getYears", authenticateToken, ExpensesControllers.getYears);

// GET /api/expenses/getExpenses?year=2025&month={month}

/**
 * @openapi
 * /api/expenses/getExpenses:
 *   get:
 *     summary: Получить расходы
 *     description: Получить расходы по году и месяцу
 *     tags:
 *       - Expenses
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

router.get("/getExpenses", validateData, ExpensesControllers.getExpenses);

// POST /api/expenses/addExpense

/**
 * @openapi
 * /api/expenses/addExpense:
 *   post:
 *     summary: Добавить расход
 *     description: Добавить расход
 *     tags:
 *       - Expenses
 *      requestBody:
 *        $ref: "#/components/requestBodies/Expenses"
 *      responses:
 *        200:
 *          description: Расход добавлен!
 * components:
 *   requestBodies:
 *     Expenses:
 *       description: Добавление расхода
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateExpnese:
 *                 type: string
 *                 example: 25.09
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

router.post("/addExpense", validateBody, ExpensesControllers.addExpense);

// DELETE /api/expenses/deleteExpense?id={id}&year=2025&month={month}&date={date}

/**
 * @openapi
 * /api/expenses/deleteExpense:
 *   delete:
 *     summary: Удлаить расход
 *     description: Удалить расход
 *     tags:
 *       - Expenses
 *      requestBody:
 *        $ref: "#/components/requestBodies/Expenses"
 *      responses:
 *        200:
 *          description: Расход удалён!
 * components:
 *   requestBodies:
 *     Expenses:
 *       description: Удаление расхода
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 12321312321
 *                 description: id
 *               year:
 *                 type: string
 *                 example: 2025
 *                 description: Год
 *               month:
 *                 type: string
 *                 example: Сентябрь
 *                 description: Месяц
 *               date:
 *                 type: string
 *                 example: 25.09
 *                 description: Дата
 */

router.delete(
  "/deleteExpense",
  validateDeleteRequest,
  validateData,
  ExpensesControllers.deleteExpense
);

export default router;
