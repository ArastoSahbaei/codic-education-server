import StatusCode from '../../../configurations/StatusCode.js'
import ShoppingCartModel from '../../models/e-commerce/ShoppingCart.model.js'
import UserModel from '../../models/User.model.js'

const addProduct = async (request, response) => {
	const shoppingCart = new ShoppingCartModel({
		user: request.body.user,
		products: request.body.products
	})

	try {
		const user = await UserModel.findById({ _id: request.body.user })
		console.log('YOO!' + user)
		await user.shoppingCart.push(shoppingCart)
		const databaseResponse = await shoppingCart.save()
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getShoppingCart = async (request, response) => {
	try {
		const databaseResponse = await ShoppingCartModel.find().populate({ path: 'shoppingCart', populate: { path: 'products' } })
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	addProduct,
	getShoppingCart,
}