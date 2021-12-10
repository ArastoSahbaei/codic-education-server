import StatusCode from "../../../configurations/StatusCode.js";
import OrderModel from "../../models/Order.model.js";
import OrderItemModel from "../../models/OrderItem.model.js";
import UserModel from "../../models/User.model.js";
import ProductModel from "../../models/Product.model.js";
import { calcTotal} from '../../functions/functions.js';
import Swish from "../../modules/Swish.js"

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
	createOrderSwish,
	getpaymentstatus
}
