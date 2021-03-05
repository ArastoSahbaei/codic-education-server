import ShoppingCartController from '../controllers/ShoppingCart.controller.js'

const routes = application => {
	/* application.post('/shoppingcart/add', ShoppingCartController.addProduct) */
	application.get('/shoppingcart', ShoppingCartController.getShoppingCart)
}

export default { routes }