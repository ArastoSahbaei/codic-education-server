import EmployeeModel from "../models/Employee.model.js"
import StatusCode from "../../configurations/StatusCode.js"

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 bytes'
    }
    const dm = decimal || 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
    const index = Math.floor(Math.log(bytes) / Math.log(1000))
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index]
}


const createEmployee = async (request, response) => {
    const employee = new EmployeeModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        dateOfBirth: request.body.dateOfBirth,
        email: request.body.email,
        mobile: request.body.mobile,
        employeeInformation: request.body.employeeInformation
        
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
        console.log('HÄR BÖRJAT fILEN' + request.file)
        const databaseResponse = await EmployeeModel.findByIdAndUpdate('61487bb1aad45e2a584ac134', {
            image: {fileName: request.file.originalname,
            filePath: request.file.path,
            fileType: request.file.mimetype,
            fileSize: fileSizeFormatter(request.file.size, 2)}
        }, { new: true })
        await databaseResponse.save()
        response.json({ message: "Successfully uploaded files" });
    } catch (error) {
        console.log(error)
    }
}


export default {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployeeWithID,
    uploadEmployeeAvatar
}