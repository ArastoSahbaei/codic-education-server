import CareerController from "../controllers/Career.controller.js";

const routes = application => {
    application.post('/career', CareerController.createJob)
    application.get('/career', CareerController.getAllJobs)
    application.get('/career/:jobId', CareerController.getJobByID)
    application.put('/career/:jobId', CareerController.updateJob)
}
export default { routes }