import StatusCode from "../../configurations/StatusCode.js"
import ApplicantModel from "../models/Applicant.model.js"
import CareerModel from "../models/Career.model.js"



const createApplicant = async (request, response) => {
    console.log(request.body)
    const applicant = new ApplicantModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        careerName: request.body.careerName
    })
    try {
        const career = await CareerModel.findById({_id: request.body.careerName})
        career.applicants.push(applicant)
        const savedApplicant = await applicant.save()
        await career.save()
        response.status(StatusCode.CREATED).send(savedApplicant)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })

    }
}

const getAllApplicants = async (request, response) => {
    try {
        const databaseResponse = await ApplicantModel.find()
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: 'No applicants registred'})
    }
}

const getApplicantWithId = async (request, response) => {
    try {
        const databaseResponse = await ApplicantModel.findOne({_id: request.params.applicantId})
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: 'Error occured while trying to retrieve applicant with ID: ' + request.params.applicantId,
            error: error.message
        })
    }
}

const updateApplicant = async (request, response) => {
    try {
        if(!request.body) {return response.status(StatusCode.BAD_REQUEST).send({message: 'Empty values were sent'}) }
        const databaseResponse = await ApplicantModel.findByIdAndUpdate(request.params.applicantId, {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            phone: request.body.phone,
            careerName: request.body.careerName
        }, {new: true})
        response.status(StatusCode.OK).send(databaseResponse)        
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to update values of the applicant with ID: ' + request.params.applicantId,
			error: error.message
        })
    }
}

const deleteApplicant = async(request, response) => {
    try {
        const databaseResponse = await ApplicantModel.findByIdAndDelete(request.params.applicantId)
        response.status(StatusCode.OK).send({message: 'Successfully deleted applicant', data: databaseResponse})
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occured while trying to delete applicant with the ID: ${request.params.applicantId}`,
            error: error.message
        })
    }
}

export default{
    createApplicant,
    getAllApplicants,
    getApplicantWithId,
    updateApplicant,
    deleteApplicant
}