import ApplicantController from "../controllers/Applicant.controller.js";


const routes = application => {
    application.post('/applicant', ApplicantController.createApplicant)
    application.get('/applicant', ApplicantController.getAllApplicants)
    application.get('/applicant/:applicantId', ApplicantController.getApplicantWithId)
    application.put('/applicant/:applicantId', ApplicantController.updateApplicant)
    application.delete('/applicant/:applicantId', ApplicantController.deleteApplicant)
}
export default { routes }