import { request, response } from "express";
import CareerModel from "../models/Career.model.js";
import StatusCode from "../../configurations/StatusCode.js";

const createJob = async (request, response) => {
    console.log(request.body);
    const job = await new CareerModel({
        title: request.body.title,
        description: request.body.description,
        city: request.body.city,
        jobType: request.body.jobType,
        lastDate: request.body.lastDate
    })
    try {

        const savedJob = await job.save()
        response.status(StatusCode.CREATED).send(savedJob)

    } catch (error) {
        console.warn(error);
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })

    }

}


const getJobByID = async (request, response) => {
    try {
        const databaseResponse = await CareerModel.findOne({ _id: request.params.jobId })
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'no job with that id' })

    }

}

const getAllJobs = async (request, response) => {
    try {
        const databaseResponse = await CareerModel.find()
        response.status(StatusCode.OK).send(databaseResponse)

    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'no jobs available' + request.params.jobId })

    }

}

const deleteJob = async (request, response) => {

}

const updateJob = async (request, response) => {
    try {
        const databaseResponse = await CareerModel.findByIdAndUpdate(request.params.jobId, {
            title: request.body.title,
            description: request.body.description,
            city: request.body.city,
            jobType: request.body.jobType,
            lastDate: request.body.lastDate,
        }, { new: true })
        response.status(StatusCode.OK).send(databaseResponse)


    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR), send({
            message: 'Error occured while trying to update the values of the job with ID: ' + request.params.jobId,
            error: error.message
        })

    }

}

export default {
    createJob,
    getAllJobs,
    getJobByID, 
    updateJob
}