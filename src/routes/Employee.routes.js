import EmployeeController from "../controllers/Employee.controller.js"
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathDestination = "configurations/uploads/employeeimages"
        fs.mkdirSync(pathDestination, { recursive: true })
        return cb(null, pathDestination)
      },
    filename: (req, file, cb) => {
        cb(null, req.params.employeeId + path.extname(file.originalname))
    }
})

const upload = multer({ storage: fileStorageEngine })

const routes = application => {
    application.get('/employee', EmployeeController.getAllEmployees)
    application.put('/employee/:employeeId', EmployeeController.updateEmployee)
    application.put('/employee/upload/:employeeId', upload.single('files'), EmployeeController.uploadEmployeeAvatar)
    application.delete('/employee/:employeeId', EmployeeController.deleteEmployeeWithID)
}

export default { routes }