import PaymentController from '../../controllers/e-commerce/Payment.controller.js'

const routes = application => {
	application.post('/payment', PaymentController.createOrderSwish)
	application.get('/getpaymentstatus/:requestId', PaymentController.getpaymentstatus)
}

export default { routes }
