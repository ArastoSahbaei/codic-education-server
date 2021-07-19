import OrderController from '../controllers/Order.controller.js'

const routes = application => {
	application.get('/order/:orderId', OrderController.getOrderById);
}

export default { routes }
