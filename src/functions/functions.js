export const numberOrElse = (n, y) => (typeof n === "number" ? n : y);

export const calculateTotalPrice = (products) =>
  products.reduce((prev, cur) => numberOrElse(prev, 0) + cur.price, 0).toFixed(2);
