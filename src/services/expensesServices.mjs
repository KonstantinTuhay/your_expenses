import { dataByYear } from "../data/index.mjs";
import {
  lowerMonth,
  stringDateTransformation,
} from "../utils/dateTransformation.mjs";

class ExpensesServices {
  getYears() {
    const years = Object.keys(dataByYear);

    return years;
  }

  getExpenses(year, month) {
    const data = dataByYear[year].find(
      (expense) => expense.month === month
    ).expenses;

    return data;
  }

  addExpense(dateExpnese, expenseCategory, description, price) {
    const [day, month, year] = dateExpnese.split(".").map(Number);
    const date = new Date(year, month - 1, day);

    const monthName = date.toLocaleString("ru-RU", { month: "long" });

    if (dataByYear[year]) {
      dataByYear[year].map((monthExpenses) => {
        const monthExpensesLower = lowerMonth(monthExpenses.month);
        const monthNameLower = lowerMonth(monthName);
        const stringDate = stringDateTransformation(day, month);
        const findDateExpenses = monthExpenses.expenses.find(
          (daysExpense) => daysExpense.date === stringDate
        );

        if (monthExpensesLower === monthNameLower) {
          if (!!findDateExpenses) {
            monthExpenses.expenses.map((expense) => {
              if (expense.date === stringDate) {
                expense.items.push({
                  expenseItem: expenseCategory,
                  description: description,
                  sum: Number(price),
                });
              }
            });
          } else {
            monthExpenses.expenses.push({
              date: stringDateTransformation(day, month),
              items: [
                {
                  expenseItem: expenseCategory,
                  description: description,
                  sum: Number(price),
                },
              ],
            });
          }
        }
      });
    } else {
      const firstLetterUpper = month.charAt(0).toUpperCase();
      const restOfString = month.slice(1);
      const resultMonth = firstLetterUpper + restOfString;

      dataByYear.year = [
        {
          id: 1,
          month: resultMonth,
          expenses: [
            {
              date: stringDateTransformation(day, month),
              items: [
                {
                  expenseItem: "Еда",
                  description: "Йогурт, бананы, шоколад",
                  sum: 1200,
                },
                {
                  expenseItem: "Поездки",
                  description: "Каршеринг",
                  sum: 2200,
                },
                {
                  expenseItem: "Еда",
                  description: "Картошка, мюcли",
                  sum: 200,
                },
              ],
            },
          ],
        },
      ];
    }
  }
}

export default new ExpensesServices();
