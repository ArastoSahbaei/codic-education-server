import StatusCode from "../../configurations/StatusCode.js";
import OrderModel from "../models/Order.model.js";
import OrderItemModel from "../models/OrderItem.model.js";
import ShoppingCartModel from "../models/ShoppingCart.model.js";
import UserModel from "../models/User.model.js";
import ProductModel from "../models/Product.model.js";
import PaypalService from "../modules/Paypal.js";
import { calcTotal, calculateTotalPrice } from '../functions/functions.js';
import Swish from "../modules/Swish.js"


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
			const ids = productIds.split(',');
			const products = await Promise.all(ids.map(id => ProductModel.findOne({ _id: id })));

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

				order.paypalOrderId = paypalOrder.result.id;

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
	const orderID = request.query.orderId;
	PaypalService.captureOrder(orderID).then(data => {
		const { existingOrder, link } = data;
		//response.send({ '_id': order._id })
		response.redirect(`http://localhost:3000/order-finished?orderId=${existingOrder._id}`); // TODO: save in configuration or something
	}).catch(error => {
		console.log(error)
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: error.message });
	});
}


const authorizeOrder = async (request, response) => {
	console.log('Running authorizeOrder');

	console.log('query', request.query);
	console.log('body', request.body);

	// 2a. Get the order ID from the request body
	const orderID = request.query.orderId;
	const existingOrder = await OrderModel.findOne({
		_id: orderID,
	});

	if (!existingOrder)
		throw new Error(`Order with id ${orderID} does not exist.`);

	const paypalOrderId = existingOrder.paypalOrderId;

	console.log('paypalOrderId', paypalOrderId);

	PaypalService.authorizeOrder(paypalOrderId).then(data => {
		const { existingOrder, link } = data;
		console.log(link);
		//response.redirect(link);
		response.redirect(`http://localhost:3000/order-finished?orderId=${existingOrder._id}`); // TODO: save in configuration or something
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
	} catch (error) {
		console.log(error)
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: error.message });
	}
}

const createOrderSwish = async (request, response) => {

	const orderItems = await Promise.all(request.body.cartItems.map(async orderItem => {
		let newOrderItem = new OrderItemModel({
			quantity: orderItem.quantity,
			product: orderItem.product,
			unitPrice: orderItem.price
		})
		return await newOrderItem.save()
	})).catch(error => {
		console.log(error)
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: error.message })
	})

	const totalAmount = calcTotal(orderItems)

	const order = new OrderModel({
		orderItems: orderItems,
		user: request.body.userId,
		shipping: request.body.shipping,
		price: totalAmount
	})

	try {
		const user = await UserModel.findById({ _id: request.body.userId })
		user.orders.push(order)
		const savedOrder = await order.save()
		await user.save()
		const swishpayment = await Swish.createPaymentRequest(savedOrder, request.body.phone)
		savedOrder.swishUuid = swishpayment.id
		savedOrder.swishPaymentReference = swishpayment.paymentReference
		await savedOrder.save()
		response.status(StatusCode.CREATED).send(savedOrder)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}

}

const getpaymentstatus = async (request, response) => {

	const paymentStatus = await Swish.getPaymentRequest(request.params.requestId).catch(error => {
		console.log(error + 'error console log')
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: error.message })
	})


	response.send(paymentStatus)
}


export default {
	createOrder,
	captureOrder,
	authorizeOrder,
	cancelOrder,
	createOrderSwish,
	getpaymentstatus
}
