import UserModel from '../models/User.model.js'
import StatusCode from "../../configurations/StatusCode.js"

const updateUserRole = async (request, response) => {
	try {
		if (!request.body) { return response.status(StatusCode.BAD_REQUEST).send({ message: 'Empty values were sent' }) }
		const databaseResponse = await UserModel.findByIdAndUpdate(request.params.userId, {
			role: request.body.role
		}, { new: true })
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to update values of the user with ID: ' + request.body.id,
			error: error.message
		})
	}
}

const updateEmployeeInformation = async (request, response) => {
    try {
        if (!request.body) { return response.status(StatusCode.BAD_REQUEST).send({ message: 'Empty values were sent' }) }
        const databaseResponse = await UserModel.findByIdAndUpdate(request.params.employeeId, {
            employeeInformation: request.body.employeeInformation
        }, { new: true })
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: 'Error occured while trying to update values of the employee with ID: ' + request.params.employeeId,
            error: error.message
        })
    }
}


export default {
    updateUserRole,
	updateEmployeeInformation
}