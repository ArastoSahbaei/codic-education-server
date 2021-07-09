import Middlewares from '../middlewares/Middlewares.js'
import PaymentController from '../controllers/Payment.controller.js'

const routes = application => {
	application.get('/payment/create-order/:productIds/:userId', PaymentController.createOrder)
	application.get('/payment/capture-order', PaymentController.captureOrder)
	application.get('/payment/authorize-order', PaymentController.authorizeOrder)
}

export default { routes }
