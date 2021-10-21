import PaymentController from '../controllers/Payment.controller.js'
import Swish from '../modules/Swish.js'

const routes = application => {
	application.get('/payment/create-order/:data', PaymentController.createOrder)
	application.get('/payment/capture-order', PaymentController.captureOrder)
	application.get('/payment/authorize-order', PaymentController.authorizeOrder)
	application.get('/payment/cancel', PaymentController.cancelOrder)
	application.post('/payment', Swish.createPaymentRequest)
}

export default { routes }
