import mongoose from 'mongoose'
const { Schema } = mongoose

const careerSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    },

    applicants: [{
        type: Schema.Types.ObjectId,
		ref: 'applicant',
    }]
}, { timestamps: true })

const CareerModel = mongoose.model('career', careerSchema)
export default CareerModel