import mongoose from 'mongoose'

const {Schema} = mongoose


const careerSchema = Schema ({

    title:{
        type: String,
        require: true, 
    },

    description: {
        type: String,
        require: true
    },

    city:{
        type: String,
        require: true
    },

    jobType:{ 
        type: String,
        require: true
    },

    lastDate:{
        type: Date,
        require: true
    }
}, {timestamps: true})

const CareerModel = mongoose.model('career', careerSchema)
export default CareerModel