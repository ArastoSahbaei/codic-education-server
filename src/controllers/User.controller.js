import NewsLetterSubscriptionModel from '../models/NewsLetterSubscription.model.js'
import ShoppingCartModel from '../models/e-commerce/ShoppingCart.model.js'
import UserModel from '../models/User.model.js'
import StatusCode from '../../configurations/StatusCode.js'
import filesizeFormatter from "../functions/filesizeFormatter.js"
import Configurations from '../../configurations/Configurations.js'
import passport from 'passport'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import { encryptPassword } from '../functions/encryptPassword.js'

dotenv.config()

const testingAuthenticatedRoute = async (request, response) => {
	response.json({ message: 'Successful' })
}

const updateCart = async (request, response) => {
	try {
		const databaseResponse = await ShoppingCartModel.findByIdAndUpdate(request.body.cartId, {
			products: request.body.products
		},
			{ new: true }).populate({ path: 'products' })
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const updateFavouriteProducts = async (request, response) => {
	try {
		if (!request.body) { return response.status(StatusCode.BAD_REQUEST).send({ message: 'Empty values were sent' }) }
		const databaseResponse = await UserModel.findByIdAndUpdate(request.body.userId, {
			favouriteProducts: request.body.favouriteProducts,
		}, { new: true }).populate('favouriteProducts')
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to update values of the user with ID: ' + request.body.userId,
			error: error.message
		})
	}
}

const login = async (request, response, next) => {
	passport.authenticate('login', (error, users, info) => {
		/* 	if (err) { console.error(`error ${err}`) } */
		if (info !== undefined) {
			info.message === 'bad username'
				? response.status(StatusCode.UNAUTHORIZED).send(info.message)
				: response.status(StatusCode.FORBIDDEN).send(info.message)
		} else {
			request.logIn(users, () => {
				UserModel.findOne({ username: request.body.username })
					.populate('newsLetterSubscription')
					.populate('favouriteProducts')
					.populate({ path: 'shoppingCart', populate: { path: 'products' } })
					.then(user => {
						const token = jwt.sign({ id: user._id }, 'jwtSecret.secret', { expiresIn: 60 * 60 })
						response.status(StatusCode.OK).send({
							shoppingCart: user.shoppingCart,
							authenticated: true,
							token,
							username: user.username,
							_id: user._id,
							email: user.email,
							newsLetterSubscription: user.newsLetterSubscription,
							favouriteProducts: user.favouriteProducts,
							personalDetails: user.personalDetails,
							accountValidation: user.accountValidation
						})
					})
			})
		}
	})(request, response, next)
}

const registerNewUser = async (request, response, next) => {
	passport.authenticate('register', async (error, createdUser, info) => {
		if (error) {
			response.status(StatusCode.DUBLICATE_RESOURCE).send({ message: error.message + info })
			console.log(error)
		} else {
			const hashedPassword = await encryptPassword(request.body.password)
			const user = new UserModel({
				username: request.body.username,
				email: request.body.email,
				password: hashedPassword,
				favouriteProducts: []
			})
			const shoppingCart = new ShoppingCartModel({
				user: user._id,
				products: request.body.products
			})
			await shoppingCart.save()
			const newsLetterSubscription = new NewsLetterSubscriptionModel({
				user: user._id,
				email: request.body.email,
				receiveNewsLetters: request.body.receiveNewsLetters
			})
			await newsLetterSubscription.save()

			user.shoppingCart = shoppingCart
			user.newsLetterSubscription = newsLetterSubscription
			await user.save()
			response.status(StatusCode.CREATED).send(user)
		}
	})(request, response, next)
}

const getAllUsers = async (request, response) => {
	try {
		const databaseResponse = await UserModel.find()
			.populate('shoppingCart')
			.populate('newsLetterSubscription')
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getUserByID = async (request, response) => {
	try {
		const databaseResponse = await (await UserModel.findOne({ _id: request.params.userId })
			.populate('newsLetterSubscription')
			.populate('favouriteProducts')
			.populate({ path: 'shoppingCart', populate: { path: 'products' } }))
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to retrieve user with ID: ' + request.params.userId,
			error: error.message
		})
	}
}

const getUserWithQuery = async (request, response) => {
	try {
		const databaseResponse = await UserModel.find({ username: request.query.username })
		databaseResponse.length !== 0
			? response.status(StatusCode.OK).send(databaseResponse)
			: response.status(StatusCode.NOT_FOUND).send({ message: 'Could not find user with username ' + request.query.username })
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to retrieve user with username: ' + request.query.userId,
			error: error.message
		})
	}
}

const updateUser = async (request, response) => {
	try {
		if (!request.body) { return response.status(StatusCode.BAD_REQUEST).send({ message: 'Empty values were sent' }) }
		const databaseResponse = await UserModel.findByIdAndUpdate(request.body.id, {
			personalDetails: request.body.personalDetails
		}, { new: true })
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to update values of the user with ID: ' + request.params.userId,
			error: error.message
		})
	}
}

const deleteUserWithID = async (request, response) => {
	try {
		const databaseResponse = await UserModel.findByIdAndDelete(request.params.userId)
		response.status(StatusCode.OK).send({ message: `Sucessfully deleted the USER with username: ${databaseResponse.username} and ID: ${request.params.userId}` })
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: `Error occured while trying to delete user with the ID: ${request.params.userId}`,
			error: error.message
		})
	}
}

const uploadAvatar = async (request, response) => {
	try {
		const databaseResponse = await UserModel.findByIdAndUpdate(request.params.userId, {
			avatar: {
				fileName: request.params.userId + path.extname(request.file.originalname),
				filePath: request.file.path,
				fileType: request.file.mimetype,
				fileSize: filesizeFormatter.fileSizeFormatter(request.file.size, 2)
			}
		}, { new: true })
		await databaseResponse.save()
		response.json({ message: "Successfully uploaded files" });
	} catch (error) {
		console.log(error)
	}
}

const updatePassword = async (request, response) => {
	try {
		const user = await UserModel.findById(request.body.userId)
		const res = await bcrypt.compare(request.body.password, user.password)
		if(res){
			const hashedPassword = await encryptPassword(request.body.newPassword)
			const databaseResponse = await UserModel.findByIdAndUpdate({ _id: request.body.userId }, {
				password: hashedPassword
			}, { new: true })
			response.status(StatusCode.OK).send(databaseResponse)
		}
		else{
			response.status(StatusCode.METHOD_NOT_ALLOWED).send('wrong current password')
		}
	} catch (error) {
		response.status(StatusCode.METHOD_NOT_ALLOWED)
	}
}

const retrieveLostAccount = async (request, response) => {
	if (request.body.email === '') {
		response.status(StatusCode.BAD_REQUEST).send('email required')
	}
	console.error(request.body.email)
	const databaseResponse = await UserModel.findOne({ email: request.body.email })
	if (databaseResponse === null) {
		response.status(StatusCode.FORBIDDEN).send('email not in db')
	} else {
		const token = crypto.randomBytes(20).toString('hex')
		await UserModel.findByIdAndUpdate(databaseResponse._id, {
			resetPasswordToken: token,
			resetPasswordExpires: Date.now() + 3600000,
		})
		Configurations.sendEmail(databaseResponse, token)
		response.status(StatusCode.CREATED).send({ message: 'ok' })
	}
}

const resetPassword = async (request, response) => {
	try {
		const databaseResponse = await UserModel.findOne({ resetPasswordToken: request.body.resetPasswordToken })
		if (Date.now() >= databaseResponse.resetPasswordExpires) {
			response.status(StatusCode.FORBIDDEN).send('password reset link is invalid or has expired')
		}
		if (databaseResponse == null) {
			response.status(StatusCode.FORBIDDEN).send('password reset link is invalid or has expired')
		} else {
			//TODO: Authenticate and allow password change.

			const BCRYPT_SALT_ROUNDS = 12
			const hashedPassword = await bcrypt.hash(request.body.password, BCRYPT_SALT_ROUNDS)
			await databaseResponse.update({
				password: hashedPassword,
				resetPasswordToken: `Password was reset at: ${Date.now()}`
			})
			response.status(StatusCode.OK).send({
				username: databaseResponse.username,
				password: hashedPassword,
				message: 'Sucessfully updated password'
			})
		}
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to reset password',
			error: error.message
		})
	}
}

const getAllEmployees = async (request, response) => {
    try {
        const databaseResponse = await UserModel.find({ role: 'employee'})
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

export default {
	testingAuthenticatedRoute,
	login,
	retrieveLostAccount,
	resetPassword,
	registerNewUser,
	getAllUsers,
	getUserByID,
	getUserWithQuery,
	updateUser,
	updatePassword,
	updateCart,
	updateFavouriteProducts,
	deleteUserWithID,
	uploadAvatar,
	getAllEmployees
}
