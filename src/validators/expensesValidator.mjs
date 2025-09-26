import { query, body } from "express-validator";

const isYearValid = (value) => {
  if (typeof value === "string") {
    return true;
  }
  return false;
};

const isDateValid = (value) => {
  const valueValidLength = value.query.date.split(".").length;

  if (typeof value.query.date === "string" && valueValidLength === 2) {
    return true;
  }
  return false;
};

export const isValidateString = (value) => {
  if (typeof value === "string") {
    return true;
  }
  return false;
};

export const validateData = [
  query("year")
    .isLength({ min: 4, max: 4 })
    .withMessage("Неверный год")
    .custom(isYearValid)
    .withMessage("Неверный тип данных"),
  query("month")
    .isIn([
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ])
    .withMessage("Неверный месяц"),
];

export const validateDeleteRequest = [
  query("date").custom(isDateValid).withMessage("Неверная дата"),
  body("id").isInt(),
];

export const validateBody = [
  body("expenseCategory")
    .custom(isValidateString)
    .withMessage("Неверный тип данных у категории"),
  body("description")
    .custom(isValidateString)
    .withMessage("Неверный тип данных у описания"),
  body("price").isInt().withMessage("Неверный тип данных у цены"),
  body("dateExpnese").custom(isValidateString).withMessage("Неверная дата"),
];
