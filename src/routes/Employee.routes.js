import EmployeeController from "../controllers/Employee.controller.js";

const routes = application => {
	application.post('/employee', EmployeeController.createEmployee)
    application.get('/employee', EmployeeController.getAllEmployees)
    application.put('/employee/:employeeId', EmployeeController.updateEmployee)
    application.delete('/employee/:employeeId', EmployeeController.deleteEmployeeWithID)
}

export default { routes }