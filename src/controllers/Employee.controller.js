import UserModel from '../models/User.model.js'
import StatusCode from "../../configurations/StatusCode.js"
import filesizeFormatter from "../functions/filesizeFormatter.js"
import path from 'path'


const getAllEmployees = async (request, response) => {
    try {
        const databaseResponse = await UserModel.find({ role: 'employee'})
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
            mobile: request.body.mobile,
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

const deleteEmployeeWithID = async (request, response) => {
    try {
        await EmployeeModel.findByIdAndDelete(request.params.employeeId)
        response.status(StatusCode.OK).send({ message: `Sucessfully deleted the employee with ID: ${request.params.employeeId}` })
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occured while trying to delete employee with ID: ${request.params.employeeId}`,
            error: error.message
        })
    }
}

const uploadEmployeeAvatar = async (request, response) => {
    try {
        const databaseResponse = await EmployeeModel.findByIdAndUpdate(request.params.employeeId, {
            image: {
                fileName: request.params.employeeId + path.extname(request.file.originalname),
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

export default {
    getAllEmployees,
    updateEmployee,
    deleteEmployeeWithID,
    uploadEmployeeAvatar
}