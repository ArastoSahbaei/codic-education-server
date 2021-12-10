export const numberOrElse = (n, y) => (typeof n === "number" ? n : y);

export const calculateTotalPrice = (products) =>
  products.reduce((prev, cur) => numberOrElse(prev, 0) + cur.price, 0).toFixed(2);


export const calcTotal = (orderItems) => {
  let total = null
  orderItems.forEach(item => {
    total += (item.quantity * item.unitPrice)
  })
  return total.toFixed(2)
}
