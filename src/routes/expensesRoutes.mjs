import express from "express";
import ExpensesControllers from "../controllers/ExpensesControllers.mjs";
import {
  validateData,
  validateDeleteRequest,
  validateBody,
} from "../validators/expensesValidator.mjs";

const router = express.Router();

// GET /api/getYears
router.get("/getYears", ExpensesControllers.getYears);

// GET /api/getExpenses?year=2025&month={month}
router.get("/getExpenses", validateData, ExpensesControllers.getExpenses);

// POST /api/addExpense
router.post("/addExpense", validateBody, ExpensesControllers.addExpense);

// DELETE /api/deleteExpense?id={id}&year=2025&month={month}&date={date}
router.delete(
  "/deleteExpense",
  validateDeleteRequest,
  validateData,
  ExpensesControllers.deleteExpense
);

export default router;
