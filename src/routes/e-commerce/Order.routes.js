import OrderController from '../../controllers/e-commerce/Order.controller.js'

const routes = application => {
	application.get('/order/:orderId', OrderController.getOrderById);
}

export default { routes }
