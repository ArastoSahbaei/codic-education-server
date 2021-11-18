import AdminController from "../controllers/Admin.Controller.js"

const routes = application => {
    application.put('/admin/updateuserrole/:userId', AdminController.updateUserRole)
	application.put('/admin/updateemployeeinfo/:employeeId', AdminController.updateEmployeeInformation)
}

export default { routes }