import dotenv from 'dotenv'
import StatusCode from '../../configurations/StatusCode.js'

dotenv.config()
const { ENVIROMENT } = process.env

const notFound = (request, response, next) => {
	const error = new Error(`Not found: ${request.originalUrl}`)
	response.status(StatusCode.NOT_FOUND)
	next(error)
}

const errorHandler = (error, request, response, next) => {
	const statuscode = (response.statusCode === StatusCode.OK) ? StatusCode.INTERNAL_SERVER_ERROR : response.statusCode
	response.status(statuscode)
	response.json({
		statuscode: statuscode,
		message: error.message,
		stacktrace: ENVIROMENT === 'PRODUCTION' ? null : error.stack,
	})
}

const checkToken = (request, response, next) => {
	const header = request.headers['authorization']
	if (typeof header !== 'undefined') {
		const bearer = header.split(' ')
		const token = bearer[1]
		request.token = token
		next()
	} else {
		response.sendStatus(StatusCode.FORBIDDEN)
	}
}

export default {
	notFound,
	errorHandler,
	checkToken,
}
