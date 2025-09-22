const lowerMonth = (month) => {
  return month.toLowerCase();
};

const stringDateTransformation = (day, month) => {
  return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}`;
};

export { lowerMonth, stringDateTransformation };
