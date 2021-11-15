import PaymentController from '../controllers/Payment.controller.js'

const routes = application => {
	application.get('/payment/create-order/:data', PaymentController.createOrder)
	application.get('/payment/capture-order', PaymentController.captureOrder)
	application.get('/payment/authorize-order', PaymentController.authorizeOrder)
	application.get('/payment/cancel', PaymentController.cancelOrder)
	application.post('/payment', PaymentController.createOrderSwish)
	application.get('/getpaymentstatus/:requestId', PaymentController.getpaymentstatus)
}

export default { routes }
