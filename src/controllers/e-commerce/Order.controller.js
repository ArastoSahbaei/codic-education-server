import OrderModel from '../../models/e-commerce/Order.model.js'
import StatusCode from '../../../configurations/StatusCode.js'

const getOrderById = async (request, response) => {
	try {
		const databaseResponse = await OrderModel.findOne({ _id: request.params.orderId }).populate({ path: 'orderItems', populate: { path: 'product', select: 'title', populate: { path: 'productBrandName', select: 'productBrandName' } } })
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to retrieve order with ID: ' + request.params.userId,
			error: error.message
		})
	}
}

export default {
	getOrderById
}
