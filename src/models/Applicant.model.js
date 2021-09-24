import mongoose from 'mongoose'
const { Schema } = mongoose

const applicant = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

}, { timestamps: true })

const ApplicantModel = mongoose.model('applicant', applicantScema)
export default ApplicantModel