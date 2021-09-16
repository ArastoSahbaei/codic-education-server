import mongoose from 'mongoose'
import employees from '../models/Employee.model.js'
import { employeeList } from './data/employees.js'

mongoose.connect('mongodb://localhost/codic', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

employeeList.forEach(employee => {
    employees.insertMany(employee)


})