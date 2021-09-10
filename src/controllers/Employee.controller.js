import EmployeeModel from "../models/Employee.model.js";
import StatusCode from "../../configurations/StatusCode.js";

const createEmployee = async (request, response) => {
    const employee = await new EmployeeModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        dateOfBirth: request.body.dateOfBirth,
        email: request.body.email,
        mobile: request.body.mobile
    })
    try {
        const databaseResponse = await employee.save()
        response.status(StatusCode.CREATED).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    
}

const getAllEmployees = async (request, response) => {
    try {
        const databaseResponse = await EmployeeModel.find()
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const updateEmployee = async (request, response) => {
    try {
        if (!request.body) { return response.status(StatusCode.BAD_REQUEST).send({ message: 'Empty values were sent' }) }
        const databaseResponse = await EmployeeModel.findByIdAndUpdate(request.params.employeeId, {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            dateOfBirth: request.body.dateOfBirth,
            email: request.body.email,
            mobile: request.body.mobile
        }, {new: true})
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to update values of the employee with ID: ' + request.params.employeeId,
			error: error.message
        })
    }
}

const deleteEmployeeWithID = async (request, response) => {
	try {
		const databaseResponse = await EmployeeModel.findByIdAndDelete(request.params.employeeId)
		response.status(StatusCode.OK).send({ message: `Sucessfully deleted the employee with ID: ${request.params.employeeId}`})
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: `Error occured while trying to delete employee with name ${response.firstName}  ${respone.lastName} the ID: ${request.params.employeeId}`,
			error: error.message
		})
	}
}

export default{
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployeeWithID
}