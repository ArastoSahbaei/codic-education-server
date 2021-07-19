import Configurations from "../../configurations/Configurations.js"
import StatusCode from "../../configurations/StatusCode.js"

const contactCodic = async (request, response) => {

	const name = request.body.name
	const email = request.body.email
	const subject = request.body.subject
	const message = request.body.message

	try {
		await Configurations.sendContactEmail(name, email, subject, message)
		response
			.status(StatusCode.CREATED)
			.send({ message: 'message was successfully sent' })
	} catch (error) {
		console.log(error)
		response
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({ message: 'error trying to send email' })
	}
}

export default {
	contactCodic
}