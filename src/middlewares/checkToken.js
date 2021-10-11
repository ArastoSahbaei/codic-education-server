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