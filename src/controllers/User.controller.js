import jwt from 'jsonwebtoken'
import passport from 'passport'
import UserModel from '../models/User.model.js'
import StatusCode from '../../configurations/StatusCode.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Configurations from '../../configurations/Configurations.js'
import ShoppingCartModel from '../models/ShoppingCart.model.js'
import NewsLetterSubscriptionModel from '../models/NewsLetterSubscription.model.js'

dotenv.config()

const testingAuthenticatedRoute = async (request, response) => {
	jwt.verify(request.token, 'jwtSecret.secret', (error, authorizedData) => {
		if (error) {
			//If error send Forbidden (403)
			response.status(StatusCode.FORBIDDEN).send({ message: `error: ${error}` })
		} else {
			//If token is successfully verified, we can send the autorized data 
			response.json({
				message: 'Successful log in',
				authorizedData
			})
		}
	})
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
						response.status(200).send({
							shoppingCart: user.shoppingCart,
							authenticated: true,
							token,
							username: user.username,
							id: user._id,
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
			response.status(StatusCode.DUBLICATE_RESOURCE).send({ message: error.message + info + 'LOL?' })
			console.log(error)
		} else {
			const BCRYPT_SALT_ROUNDS = 12
			const hashedPassword = await bcrypt.hash(request.body.password, BCRYPT_SALT_ROUNDS)
			const user = await new UserModel({
				username: request.body.username,
				email: request.body.email,
				password: hashedPassword,
				name: request.body.name,
				favouriteProducts: []
			})
			const shoppingCart = await new ShoppingCartModel({
				user: user._id,
				products: request.body.products
			})
			await shoppingCart.save()
			const newsLetterSubscription = await new NewsLetterSubscriptionModel({
				email: request.body.email,
				user: user._id,
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
		const databaseResponse = await UserModel.find(request.params.userId, {
			username: request.body.username,
			password: request.body.password,
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

const updatePassword = (request, response) => {
	const BCRYPT_SALT_ROUNDS = 12
	passport.authenticate('jwt', { session: false }, (error, user, info) => {
		if (error) { console.error(error) }
		if (info !== undefined) {
			console.error(info.message)
			response.status(403).send(info.message)
		} else {
			UserModel.findOne({
				username: request.body.username,
			}).then((userInfo) => {
				if (userInfo != null) {
					console.log('user found in db')
					bcrypt
						.hash(request.body.password, BCRYPT_SALT_ROUNDS)
						.then((hashedPassword) => {
							userInfo.update({
								password: hashedPassword,
							})
						})
						.then(() => {
							console.log('password updated')
							response
								.status(200)
								.send({ auth: true, message: 'password updated' })
						})
				} else {
					console.error('no user exists in db to update')
					response.status(404).json('no user exists in db to update')
				}
			})
		}
	})(request, response, next)
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
}
