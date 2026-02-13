export const isNumber = (value) => /^[0-9]*$/.test(value);
export const isInt = (number) => +number % 1 === 0;
