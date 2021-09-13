import mongoose from 'mongoose'
const { Schema } = mongoose

const employeeSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    employeeInformation: {
        startEmployeeDate: Date,
        lastEmployeeDate: Date
    }

}, { timestamps: true })

const EmployeeModel = mongoose.model('employee', employeeSchema)
export default EmployeeModel