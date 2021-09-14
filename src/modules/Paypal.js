import paypal from "@paypal/checkout-server-sdk";
import { calculateTotalPrice } from "../functions/functions.js";
import { productToPaypalModel } from "../models/Product.model.js";
import OrderModel from "../models/Order.model.js";

// Creating an environment
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const authorizeOrder = (orderID) => {
  console.log('Running authorizeOrder');
  paypal.orders
	const request = new paypal.orders.OrdersAuthorizeRequest(orderID);
	const client = new paypal.core.PayPalHttpClient(environment);

	return new Promise(async (resolve, reject) => {
		try {
			const authorization = await client.execute(request);
      console.log('AUTH', authorization);
      console.log(authorization.result);
      console.log(authorization.result.links);

      const links = authorization.result.links;
      const link = links.find(l => l.rel === "self");
      const href = link ? link.href : null;

			// 4. Save the authorization ID to your database
			const authorizationID =
				authorization.result.purchase_units[0].payments.authorizations[0].id;

			const existingOrder = await OrderModel.findOne({
				paypalOrderId: orderID,
			});

			if (existingOrder) {
				existingOrder.paypalAuthorizeId = authorizationID;
				await existingOrder.save();
				/*captureOrder(orderID)
					.then((data) => {
						resolve(data);
					})
					.catch((error) => {
						console.log(error);
						reject(error);
					});*/
				resolve({ existingOrder, link: href});
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

const captureOrder = async (orderID) => {
  const existingOrder = await OrderModel.findOne({
		_id: orderID,
	});

  if (!existingOrder) {
    const error = `Order with paypalOrderId ${orderID} does not exist.`;
		console.log(error);
		throw new Error(error);
  }

  console.log('Running captureOrder');
	const request = new paypal.orders.OrdersCaptureRequest(existingOrder.paypalOrderId);
	const client = new paypal.core.PayPalHttpClient(environment);

	return new Promise(async (resolve, reject) => {
		try {
			const capture = await client.execute(request);

      const links = capture.result.links;
      const link = links.find(l => l.rel === "self");
      const href = link ? link.href : null;

			// 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
			const captureID =
				capture.result.purchase_units[0].payments.captures[0].id;

			existingOrder.paypalCaptureId = captureID;
			await existingOrder.save();
			resolve({ existingOrder, link: href});
			// await database.saveCaptureID(captureID);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

const sendProductsToPaypal = (products, shipping, order) => {
  console.log('Running sendProductsToPaypal');
	const itemTotal = calculateTotalPrice(products);
	const total = itemTotal; // TODO: fixme
	const handling = 0; // TODO: fixme
	const taxTotal = 0; // TODO: fixme
	const shippingCost = 0; // TODO: fixme
	const discount = 0; // TODO: fixme
	const finalDescription = "some products"; // TODO: fixme
	const paypalProducts = products.map(productToPaypalModel);
	const request = new paypal.orders.OrdersCreateRequest();
	const client = new paypal.core.PayPalHttpClient(environment);


	return new Promise(async (resolve, reject) => {
		request.prefer("return=representation");
		request.requestBody({
			intent: "CAPTURE",
			application_context: {
				return_url: "http://localhost:3001" + `/payment/capture-order?orderId=${order._id}`,
				cancel_url: "http://localhost:3001" + `/payment/cancel`,
				locale: "en-US",
				landing_page: "BILLING",
				shipping_preference: "SET_PROVIDED_ADDRESS",
				shipping_address: shipping.address,
				user_action: "CONTINUE",
			},
			payer: {
				payment_method: "paypal",
			},
			purchase_units: [
				{
					reference_id: order._id,
					description: "Codic order",

					custom_id: order._id,
					soft_descriptor: "codicOrder",
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
								value: shippingCost,
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
						method: shipping.method,
						name: {
							full_name: shipping.fullName,
						},
						address: {
							address_line_1: shipping.addressFull,
							address_line_2: '',
							admin_area_1: shipping.shippingCity,
							admin_area_2: shipping.shippingCity,
							postal_code: shipping.shippingPostalCode,
							country_code: shipping.countryCode,
						},
					},
				},
			],
		});

		let paypalOrder;
		try {
			paypalOrder = await client.execute(request);
			resolve(paypalOrder);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export default {
	sendProductsToPaypal,
	authorizeOrder,
  captureOrder
};
