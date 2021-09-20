import newsLetterSubscription from "../src/models/NewsLetterSubscription.model.js";
import employees from '../src/models/Employee.model.js'
import { employeeList } from './data/employees.js' 
import users from	'../src/models/User.model.js'
import { userList } from './data/users.js'


const seedToDatabase = async () => {

	employeeList.forEach(employee => {
		try {
			employees.insertMany(employee)
			.then(console.log('employees imported'))
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}	
		})
	userList.forEach(user => {
		try {
			users.insertMany(user)
			.then(console.log('users imported'))
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
		})
}
export default {
    seedToDatabase
}