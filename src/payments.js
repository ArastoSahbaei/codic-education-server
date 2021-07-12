export const TAX_PERCENTAGE = 6.0;
export const CURRENCY = "SEK";


import { numberOrElse } from './functions.js';


export const calculateTotalPrice = (products, withTax) =>
  (products.reduce((prev, cur) => numberOrElse(prev, 0) + cur.price + (withTax ? getTax(cur) : 0), 0));


export const getTax = (product) =>
  (product.price * (TAX_PERCENTAGE / 100.0));


export const calculateTotalTax = (products) =>
  (products.reduce((prev, cur) => numberOrElse(prev, 0) + getTax(cur), 0));
