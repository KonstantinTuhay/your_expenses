import { body } from "express-validator";
import { isValidateString } from "./expensesValidator.mjs";

export const validateEmail = [
  body("email").isEmail().withMessage("Неверный имейл!"),
];
export const validatePassword = [body("password").isLength({ min: 6 })];
export const validateFirstName = [
  body("firstName")
    .custom(isValidateString)
    .withMessage("Неверный тип данный имени"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Неверный имейл!"),
  body("password").isLength({ min: 6 }),
];

export const validateRegister = [
  body("email").isEmail().withMessage("Неверный имейл!"),
  body("password").isLength({ min: 6 }),
  body("firstName")
    .custom(isValidateString)
    .withMessage("Неверный тип данный имени"),
];
