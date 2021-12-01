import { authenticateBasicUser } from '../middlewares/authenticateBasicUser.js'
import UserController from '../controllers/User.controller.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		const pathDestination = "configurations/uploads/useravatars"
		fs.mkdirSync(pathDestination, { recursive: true })
		return cb(null, pathDestination)
	},
	filename: (req, file, cb) => {
		cb(null, req.params.userId + path.extname(file.originalname))
	}
})

const upload = multer({ storage: fileStorageEngine })

const routes = application => {
	application.post('/user/login', UserController.login)
	application.post('/user/register', UserController.registerNewUser)
	application.post('/retrieveaccount', UserController.retrieveLostAccount)

	application.get('/authtest', authenticateBasicUser, UserController.testingAuthenticatedRoute)
	application.get('/searchuser', UserController.getUserWithQuery)
	application.get('/user', UserController.getAllUsers)
	application.get('/user/:userId', UserController.getUserByID)
	application.get('/employee', UserController.getAllEmployees)

	application.put('/user', authenticateBasicUser, UserController.updateUser)
	application.put('/updatepassword', UserController.updatePassword)
	application.put('/resetpassword', UserController.resetPassword)
	application.put('/shoppingcart/add', UserController.updateCart)
	application.put('/favouriteproducts', UserController.updateFavouriteProducts)
	application.put('/user/upload/:userId', upload.single('files'), UserController.uploadAvatar)

	application.delete('/user/:userId', UserController.deleteUserWithID)

}

export default { routes }