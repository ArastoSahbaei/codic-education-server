import AdminController from "../controllers/Admin.Controller.js"
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js"

const routes = application => {
    application.put('/admin/updateuserrole/:userId', authenticateAdmin, AdminController.updateUserRole)
	application.put('/admin/updateemployeeinfo/:employeeId', authenticateAdmin, AdminController.updateEmployeeInformation)
}

export default { routes }