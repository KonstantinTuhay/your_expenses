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
router.post("/login", validateLogin, UsersControllers.login);

// POST /api/expenses/register
router.post("/register", validateRegister, UsersControllers.register);

// GET /api/expenses/getYears
router.get("/getYears", authenticateToken, ExpensesControllers.getYears);

// GET /api/expenses/getExpenses?year=2025&month={month}
router.get("/getExpenses", validateData, ExpensesControllers.getExpenses);

// POST /api/expenses/addExpense
router.post("/addExpense", validateBody, ExpensesControllers.addExpense);

// DELETE /api/expenses/deleteExpense?id={id}&year=2025&month={month}&date={date}
router.delete(
  "/deleteExpense",
  validateDeleteRequest,
  validateData,
  ExpensesControllers.deleteExpense
);

export default router;
