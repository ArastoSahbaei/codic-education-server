import { request, response } from "express";
import CareerModel from "../models/Career.model.js";
import StatusCode from "../../configurations/StatusCode.js";

const createJobb = async (request, response) => {
    console.log(request.body);
    const jobb = await new CareerModel({
        title: request.body.title,
        description: request.body.description,
        city: request.body.city,
        jobType: request.body.jobType,
        lastDate: request.body.lastDate
    })
    try{  

        const savedJobb = await jobb.save()
        response.status(StatusCode.CREATED).send(savedJobb)

    } catch(error) {
        console.warn(error);
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})

    }

}

export default {
    createJobb
}