import ApplicantController from "../controllers/Applicant.controller.js"

const routes = application => {
	application.post('/applicant', ApplicantController.createApplyforCareer)
	application.get('/applicant', ApplicantController.getAllApplicants)
	application.get('/applicant/:applicantId', ApplicantController.getApplicantWithId)
}

export default { routes }