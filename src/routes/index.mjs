import express from "express";
import expensesRoutes from "./expensesRoutes.mjs";
import {
  validateEmail,
  validatePassword,
  validateFirstName,
} from "../validators/authValidate.mjs";
import UsersControllers from "../controllers/UsersControllers.mjs";

const router = express.Router();

// POST /api/login

/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Логин пользователя
 *      description: Чтобы залогиниться пользователю
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Userslogin"
 *      responses:
 *        200:
 *          description: Успешный вход
 * components:
 *   requestBodies:
 *     Userslogin:
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
 *                 example: 12345
 *                 description: Пароль пользователя
 */

router.post("/login", validateEmail, validatePassword, UsersControllers.login);

// POST /api/register

/**
 * @swagger
 * /api/register:
 *    post:
 *      summary: Зарегистрировать пользователя
 *      description: Регистрация пользователя
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Usersregister"
 *      responses:
 *        200:
 *          description: Пользователь зарегистрирован
 * components:
 *   requestBodies:
 *     Usersregister:
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
 *                 example: 123456
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

router.use("/expenses", expensesRoutes);

export default router;
