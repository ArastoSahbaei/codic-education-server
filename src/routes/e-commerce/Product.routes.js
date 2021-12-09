import ProductController from '../../controllers/e-commerce/Product.controller.js'

const routes = application => {
	application.post('/product', ProductController.createProduct)
	application.get('/product', ProductController.getAllProducts)
	application.get('/product/:productId', ProductController.getProductById)
	application.put('/product/:productId', ProductController.updateProduct)
	application.delete('/product/:productId', ProductController.deleteProduct)
}

export default { routes }