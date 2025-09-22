import express from "express";
import expensesRoutes from "./expensesRoutes.mjs";

const router = express.Router();

router.use("/expenses", expensesRoutes);

export default router;
