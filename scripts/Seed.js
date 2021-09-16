import employees from '../src/models/Employee.model.js'
import { employeeList } from './data/employees.js'


const seedToDatabase = async () => {

	employeeList.forEach(employee => {
		try {
			employees.insertMany(employee)
			.then(console.log('employees imported'))
			
			
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
		
		})
}

export default {
    seedToDatabase
}