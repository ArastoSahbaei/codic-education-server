import UserController from '../controllers/User.controller.js'
import Middlewares from '../middlewares/Middlewares.js'

const routes = application => {
	application.post('/user/login', UserController.login)
	application.post('/user/register', UserController.registerNewUser)
	application.post('/retrieveaccount', UserController.retrieveLostAccount)
	application.get('/authtest', Middlewares.checkToken, UserController.testingAuthenticatedRoute)
	application.get('/searchuser', UserController.getUserWithQuery)
	application.get('/user', UserController.getAllUsers)
	application.get('/user/:userId', UserController.getUserByID)
	application.put('/user/:userId', UserController.updateUser)
	application.put('/updatepassword', UserController.updatePassword)
	application.put('/resetpassword', UserController.resetPassword)
	application.put('/shoppingcart/add', UserController.updateCart)
	application.put('/favouriteproducts', UserController.updateFavouriteProducts)
	application.delete('/user/:userId', UserController.deleteUserWithID)
}

export default { routes }