import StatusCode from "../../configurations/StatusCode.js";
import OrderModel from "../models/Order.model.js";
import ShoppingCartModel from "../models/ShoppingCart.model.js";
import UserModel from "../models/User.model.js";
import ProductModel from "../models/Product.model.js";
import PaypalService from "../modules/Paypal.js";
import { calculateTotalPrice } from '../functions/functions.js';

const createOrder = async (request, response) => {
  console.log('Running createOrder');
	const data = JSON.parse(new Buffer(request.params.data, 'base64').toString('ascii'));

	const { userId, form, productIds } = data;

	const shipping = Object.keys(form).reduce((prev, cur) => ({
		...prev,
		[cur]: form[cur].value
	}), {});

	shipping.addressFull = `${shipping.shippingStreet} ${shipping.shippingPostalCode} ${shipping.shippingCity}`;
	shipping.countryCode = 'SE';
	shipping.fullName = `${shipping.firstname} ${shipping.lastname}`;

	UserModel.findById({ _id: userId })
		.then(async (user) => {
			const products = await ProductModel.find({ _id: [productIds] });

      const order = await new OrderModel({
					products: products,
					user: user
			});

      await order.save();

			PaypalService.sendProductsToPaypal(products, shipping, order).then(async paypalOrder => {

				const links = paypalOrder.result.links;

        console.log('links', links);

				const redirectLink = links.find(link => link.rel === "approve");
				const href = redirectLink && redirectLink.href;


				order.paypalOrderId = paypalOrder.orderID;

				await order.save();
        console.log('order saved', order);

				if (href) {
					return response.redirect(href);
				} else {
					throw new Error(href);
				}
			}).catch(error => {
				console.log(error)
				response
					.status(StatusCode.INTERNAL_SERVER_ERROR)
					.send({ message: error.message });
			});
		})
		.catch((error) => {
			console.log(error)
			response
				.status(StatusCode.INTERNAL_SERVER_ERROR)
				.send({ message: error.message });
		});
};


const captureOrder = async (request, response) => {
	const orderID = request.query.orderID;
	PaypalService.captureOrder(orderID).then(order => {
		response.send({ '_id': order._id })
	}).catch(error => {
		console.log(error)
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: error.message });
	});
}


const authorizeOrder = async (request, response) => {
  console.log('Running authorizeOrder');

	// 2a. Get the order ID from the request body
	const orderID = request.query.codicOrderID;
  const existingOrder = await OrderModel.findOne({
		_id: orderID,
	});

  if (!existingOrder)
    throw new Error(`Order with id ${orderID} does not exist.`);

  const paypalOrderId = existingOrder.paypalOrderId;

  console.log('paypalOrderId', paypalOrderId);

	PaypalService.authorizeOrder(paypalOrderId).then(order => {
		response.send({ '_id': order._id })
	}).catch(error => {
		console.log(error)
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: error.message });
	});
}

const cancelOrder = async (request, response) => {
  try {
		console.log('Running authorizeOrder');

		// 2a. Get the order ID from the request body
		const token = request.query.token;

		console.log(request.query.token);
		const existingOrder = await OrderModel.findOne({
			paypalToken: token,
		});

		if (!existingOrder) {
			console.log(`Order with token ${token} does not exist.`);
      response.redirect('http://localhost:3000'); // TODO: store in some configuration somewhere.
    }

		const paypalOrderId = existingOrder.paypalOrderId;

		console.log('paypalToken', token);

		PaypalService.authorizeOrder(paypalOrderId).then(order => {
			response.send({ '_id': order._id })
		}).catch(error => {
			console.log(error)
			response
				.status(StatusCode.INTERNAL_SERVER_ERROR)
				.send({ message: error.message });
		});
  } catch(error) {
    console.log(error)
			response
				.status(StatusCode.INTERNAL_SERVER_ERROR)
				.send({ message: error.message });
  }
}

export default {
	createOrder,
	captureOrder,
	authorizeOrder,
  cancelOrder
};
