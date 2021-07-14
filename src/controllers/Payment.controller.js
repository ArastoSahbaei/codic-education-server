import StatusCode from "../../configurations/StatusCode.js";
import OrderModel from "../models/Order.model.js";
import ShoppingCartModel from "../models/ShoppingCart.model.js";
import UserModel from "../models/User.model.js";
import ProductModel from "../models/Product.model.js";
import PaypalService from "../modules/Paypal.js";
import { calculateTotalPrice } from '../functions/functions.js';

const createOrder = async (request, response) => {
	const data = JSON.parse(new Buffer(request.params.data, 'base64').toString('ascii'));

	const { userId, form, productIds } = data;

	const shipping = Object.keys(form).reduce((prev, cur) => ({
		...prev,
		[cur]: form[cur].value
	}), {});

	shipping.addressFull = `${shipping.shippingStreet} ${shipping.shippingPostalCode} ${shipping.shippingCity}`;
	shipping.countryCode = 'SE';
	shipping.fullName = `${shipping.firstname} ${shipping.lastname}`;


	console.log('apa', shipping);

	UserModel.findById({ _id: userId })
		.then(async (user) => {
			const products = await ProductModel.find({ _id: [productIds] });

			PaypalService.sendProductsToPaypal(products, shipping).then(async paypalOrder => {

				const links = paypalOrder.result.links;

				const redirectLink = links.find(link => link.rel === "approve");
				const href = redirectLink && redirectLink.href;

				const order = await new OrderModel({
					products: products,
					paypalOrderId: paypalOrder.orderID,
					user: user
				});
				await order.save();

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
	const orderID = request.body.orderID;
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

	// 2a. Get the order ID from the request body
	const orderID = request.body.orderID;

	PaypalService.authorizeOrder(orderID).then(order => {
		response.send({ '_id': order._id })
	}).catch(error => {
		console.log(error)
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: error.message });
	});

}

export default {
	createOrder,
	captureOrder,
	authorizeOrder
};
