import {
  lowerMonth,
  stringDateTransformation,
} from "../utils/dateTransformation.mjs";
import fs from "fs";
import { nanoid } from "nanoid";

class ExpensesServices {
  getYears() {
    return new Promise((res, rej) => {
      fs.readFile("expenses.json", "utf8", (err, data) => {
        const parsedData = JSON.parse(data);

        res(Object.keys(parsedData));
      });
    });
  }

  getExpenses(year, month) {
    return new Promise((res, rej) => {
      fs.readFile("expenses.json", "utf8", (err, data) => {
        const parsedData = JSON.parse(data);

        const resultData = parsedData[year].find(
          (expense) => expense.month === month
        ).expenses;

        res(resultData);
      });
    });
  }

  addExpense(dateExpnese, expenseCategory, description, price) {
    const [day, month, year] = dateExpnese.split(".").map(Number);
    const date = new Date(year, month - 1, day + 1);

    const monthName = date.toLocaleString("ru-RU", { month: "long" });

    return new Promise((res, rej) => {
      fs.readFile("expenses.json", "utf8", (err, data) => {
        const parseDataByYear = JSON.parse(data);

        if (parseDataByYear[year]) {
          // Находим нужный месяц
          const monthIndex = parseDataByYear[year].findIndex(
            (monthExpenses) =>
              lowerMonth(monthExpenses.month) === lowerMonth(monthName)
          );

          if (monthIndex !== -1) {
            // Месяц существует, добавляем расход
            const monthExpenses = parseDataByYear[year][monthIndex];
            const stringDate = stringDateTransformation(day, month);
            const findDateExpenses = monthExpenses.expenses.find(
              (daysExpense) => daysExpense.date === stringDate
            );

            if (findDateExpenses) {
              // Дата существует, добавляем к существующим расходам
              findDateExpenses.items.push({
                id: nanoid(),
                expenseItem: expenseCategory,
                description: description,
                sum: Number(price),
              });

              monthExpenses.expenses.sort((a, b) => a.date - b.date);
            } else {
              // Дата не существует, создаем новую
              monthExpenses.expenses.push({
                date: stringDateTransformation(day, month),
                items: [
                  {
                    id: nanoid(),
                    expenseItem: expenseCategory,
                    description: description,
                    sum: Number(price),
                  },
                ],
              });

              monthExpenses.expenses.sort((a, b) => a.date - b.date);
            }
          } else {
            // Месяц не существует, создаем новый
            const firstLetterUpper = monthName.charAt(0).toUpperCase();
            const restOfString = monthName.slice(1);
            const resultMonth = firstLetterUpper + restOfString;

            parseDataByYear[year].push({
              id: parseDataByYear[year].length + 1,
              month: resultMonth,
              expenses: [
                {
                  date: stringDateTransformation(day, month),
                  items: [
                    {
                      id: nanoid(),
                      expenseItem: expenseCategory,
                      description: description,
                      sum: Number(price),
                    },
                  ],
                },
              ],
            });
          }

          const resultData = JSON.stringify(parseDataByYear);

          // Сохраняем обновленные данные
          fs.writeFile("expenses.json", resultData, (err) => {
            if (err) return console.error(err);

            res("Файл сохранён");
          });
        } else {
          // Год не существует, создаем новый год с месяцем
          const firstLetterUpper = monthName.charAt(0).toUpperCase();
          const restOfString = monthName.slice(1);
          const resultMonth = firstLetterUpper + restOfString;

          parseDataByYear[year] = [
            {
              id: 1,
              month: resultMonth,
              expenses: [
                {
                  date: stringDateTransformation(day, month),
                  items: [
                    {
                      id: nanoid(),
                      expenseItem: expenseCategory,
                      description: description,
                      sum: Number(price),
                    },
                  ],
                },
              ],
            },
          ];

          const resultData = JSON.stringify(parseDataByYear);

          // Сохраняем новые данные
          fs.writeFile("expenses.json", resultData, (err) => {
            if (err) return console.error(err);

            res("Файл сохранён");
          });
        }
      });
    });
  }

  deleteExpense(id, year, month, date) {
    return new Promise((res, rej) => {
      fs.readFile("expenses.json", "utf8", (err, data) => {
        const parseDataByYear = JSON.parse(data);

        // Находим нужный месяц
        const monthIndex = parseDataByYear[year].findIndex(
          (monthExpenses) =>
            lowerMonth(monthExpenses.month) === lowerMonth(month)
        );

        const findExpenseIndex = parseDataByYear[year][
          monthIndex
        ].expenses.findIndex((item) => item.date === date);

        parseDataByYear[year][monthIndex].expenses[findExpenseIndex].items =
          parseDataByYear[year][monthIndex].expenses[
            findExpenseIndex
          ].items.filter((item) => item.id !== id);

        if (
          parseDataByYear[year][monthIndex].expenses[findExpenseIndex].items
            .length === 0
        ) {
          parseDataByYear[year][monthIndex].expenses = parseDataByYear[year][
            monthIndex
          ].expenses.filter((item) => item.date !== date);
        }

        const resultData = JSON.stringify(parseDataByYear);

        // Сохраняем новые данные
        fs.writeFile("expenses.json", resultData, (err) => {
          if (err) return console.error(err);

          res("Файл сохранён");
        });
      });
    });
  }
}

export default new ExpensesServices();
