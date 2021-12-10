import NewsLetterSubscriptionModel from '../models/NewsLetterSubscription.model.js'
import StatusCode from '../../configurations/StatusCode.js'

const addNewsLetterSubscription = async (request, response) => {
	const newsLetterSubscription = new NewsLetterSubscriptionModel({
		email: request.body.email,
		user: request.body.user,
		receiveNewsLetters: request.body.receiveNewsLetters
	})
	try {
		const databaseResponse = await newsLetterSubscription.save()
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getAllNewsLetterSubscriptions = async (request, response) => {
	try {
		const databaseResponse = await NewsLetterSubscriptionModel.find()
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const updateNewsLetterSubscription = async (request, response) => {
	try {
		const databaseResponse = await NewsLetterSubscriptionModel.findByIdAndUpdate(request.params.newsLetterId, {
			receiveNewsLetters: request.body.receiveNewsLetters
		}, { new: true })
		console.log(request.params.newsLetterId)
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const checkIfEmailExists = async (request, response) => {
	try {
		let databaseResponse = await NewsLetterSubscriptionModel.findOne({email: request.body.email})
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	addNewsLetterSubscription,
	getAllNewsLetterSubscriptions,
	updateNewsLetterSubscription,
	checkIfEmailExists
}

