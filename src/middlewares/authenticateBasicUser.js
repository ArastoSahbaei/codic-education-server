import jwt from 'jsonwebtoken'
import StatusCode from '../../configurations/StatusCode.js'

export const authenticateBasicUser = (request, response, next) => {
	const header = request.headers['authorization']
	if (typeof header !== 'undefined') {
		const bearer = header.split(' ')
		const token = bearer[1]
		const verified = jwt.verify(token, 'jwtSecret.secret')
		const isCorrectUser = request.body.id && request.body.id === verified.id
		if (isCorrectUser) {
			next()
		} else {
			response.sendStatus(StatusCode.FORBIDDEN)
		}
	} else {
		response.sendStatus(StatusCode.FORBIDDEN)
	}
}