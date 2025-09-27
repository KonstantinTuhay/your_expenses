// POST /api/expenses/login

/**
 * @swagger
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
 *          description: Таска успешно создана
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

// POST /api/expenses/register

/**
 * @swagger
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

// GET /api/expenses/getYears

/**
 * @swagger
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

// GET /api/expenses/getExpenses?year=2025&month={month}

/**
 * @swagger
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

// POST /api/expenses/addExpense

/**
 * @swagger
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

// DELETE /api/expenses/deleteExpense?id={id}&year=2025&month={month}&date={date}

/**
 * @swagger
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
