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
        firstName:{
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        }

    }]
}, { timestamps: true })

const CareerModel = mongoose.model('career', careerSchema)
export default CareerModel