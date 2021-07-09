import paypal from "@paypal/checkout-server-sdk";
import { calculateTotalPrice } from "../functions.js";
import { productToPaypalModel } from "../models/Product.model.js";

// Creating an environment
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const authorizeOrder = (orderID) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  const client = new paypal.core.PayPalHttpClient(environment);

  return new Promise(async (resolve, reject) => {
    try {
      const authorization = await client.execute(request);

      // 4. Save the authorization ID to your database
      const authorizationID =
        authorization.result.purchase_units[0].payments.authorizations[0].id;

      const existingOrder = await OrderModel.findOne({
        paypalOrderId: orderId,
      });

      if (existingOrder) {
        existingOrder.paypalAuthorizeId = authorizationID;
        await existingOrder.save();
        captureOrder(orderId)
          .then((order) => {
            resolve(order);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
        resolve(existingOrder);
      } else {
        const error = `Order with paypalOrderId ${orderID} does not exist.`;
        console.log(error);
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const captureOrder = (orderID) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  const client = new paypal.core.PayPalHttpClient(environment);

  return new Promise(async (resolve, reject) => {
    try {
      const capture = await client.execute(request);

      // 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
      const captureID =
        capture.result.purchase_units[0].payments.captures[0].id;

      const existingOrder = await OrderModel.findOne({
        paypalOrderId: orderId,
      });

      if (existingOrder) {
        existingOrder.paypalCaptureId = captureID;
        await existingOrder.save();
        resolve(existingOrder);
      } else {
        const error = `Order with paypalOrderId ${orderID} does not exist.`;
        console.log(error);
        throw new Error(error);
      }
      // await database.saveCaptureID(captureID);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const sendProductsToPaypal = (products) => {
  const itemTotal = calculateTotalPrice(products);
  const total = itemTotal; // TODO: fixme
  const handling = 0; // TODO: fixme
  const taxTotal = 0; // TODO: fixme
  const shipping = 0; // TODO: fixme
  const discount = 0; // TODO: fixme
  const finalDescription = "some products"; // TODO: fixme
  const paypalProducts = products.map(productToPaypalModel);
  const request = new paypal.orders.OrdersCreateRequest();
  const client = new paypal.core.PayPalHttpClient(environment);


  return new Promise(async (resolve, reject) => {
    request.prefer("return=representation");
    request.requestBody({
      intent: "AUTHORIZE",
      application_context: {
        return_url: "http://localhost:3001" + "/payment/authorize-order",
        cancel_url: "http://localhost:3001" + "/payment/cancel",
        locale: "en-US",
        landing_page: "BILLING",
        shipping_preference: "SET_PROVIDED_ADDRESS",
        shipping_address: "Test test 123",
        user_action: "CONTINUE",
      },
      payer: {
        payment_method: "paypal",
      },
      purchase_units: [
        {
          reference_id: "PUHF",
          description: "Sporting Goods",

          custom_id: "CUST-HighFashions",
          soft_descriptor: "HighFashions",
          amount: {
            currency_code: "SEK",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "SEK",
                value: itemTotal,
              },
              shipping: {
                currency_code: "SEK",
                value: shipping,
              },
              handling: {
                currency_code: "SEK",
                value: handling,
              },
              tax_total: {
                currency_code: "SEK",
                value: taxTotal,
              },
              shipping_discount: {
                currency_code: "SEK",
                value: discount,
              },
            },
          },
          items: paypalProducts,
          shipping: {
            method: "United States Postal Service",
            name: {
              full_name: "John Doe",
            },
            address: {
              address_line_1: "123 Townsend St",
              address_line_2: "Floor 6",
              admin_area_2: "San Francisco",
              admin_area_1: "CA",
              postal_code: "94107",
              country_code: "US",
            },
          },
        },
      ],
    });

    let order;
    try {
      order = await client.execute(request);
      resolve(order);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default {
  sendProductsToPaypal,
  authorizeOrder,
};
