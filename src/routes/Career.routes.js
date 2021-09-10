import CareerController from "../controllers/Career.controller.js";

const routes = application => {
    application.post('/career', CareerController.createJobb)
}
export default { routes }