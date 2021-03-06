import StatusCode from "../../configurations/StatusCode.js"
import ApplicantModel from "../models/Applicant.model.js"
import CareerModel from "../models/Career.model.js"

const createApplyforCareer = async (request, response) => {
	const applicant = new ApplicantModel({
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		phone: request.body.phone,
		career: request.body.career
	})
	try {
		const career = await CareerModel.findById({ _id: request.body.career })
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
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Error receiving applicants' })
	}
}

const getApplicantWithId = async (request, response) => {
	try {
		const databaseResponse = await ApplicantModel.findOne({ _id: request.params.applicantId })
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to retrieve applicant with ID: ' + request.params.applicantId,
			error: error.message
		})
	}
}

export default {
	createApplyforCareer,
	getAllApplicants,
	getApplicantWithId,
}