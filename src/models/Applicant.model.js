import mongoose from 'mongoose'
const { Schema } = mongoose

const applicantSchema = Schema({
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
    careerName: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'career',
        required: true
        }]
}, { timestamps: true })

const ApplicantModel = mongoose.model('applicant', applicantSchema)
export default ApplicantModel