import EmployeeController from "../controllers/Employee.controller.js"
import multer from 'multer'

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "configurations/uploads/employeeImages")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

const routes = application => {
    application.post('/employee', EmployeeController.createEmployee)
    application.get('/employee', EmployeeController.getAllEmployees)
    application.put('/employee/:employeeId', EmployeeController.updateEmployee)
    application.delete('/employee/:employeeId', EmployeeController.deleteEmployeeWithID)
    application.put('/haha', upload.single('files') , EmployeeController.uploadEmployeeAvatar)
}

export default { routes }