import EmployeeController from "../controllers/Employee.controller.js"
import multer from 'multer'
import path from 'path'

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "configurations/uploads/employeeImages")
    },
    filename: (req, file, cb) => {
        cb(null, req.params.employeeId + path.extname(file.originalname))
    }
})

const upload = multer({ storage: fileStorageEngine })

const routes = application => {
    application.post('/employee', EmployeeController.createEmployee)
    application.get('/employee', EmployeeController.getAllEmployees)
    application.put('/employee/:employeeId', EmployeeController.updateEmployee)
    application.delete('/employee/:employeeId', EmployeeController.deleteEmployeeWithID)
    application.put('/employee/upload/:employeeId', upload.single('files') , EmployeeController.uploadEmployeeAvatar)
}

export default { routes }