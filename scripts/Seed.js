import employees from '../src/models/Employee.model.js'
import { employeeList } from './data/employees.js'
// import dotenv from 'dotenv'

// dotenv.config()
// const {
// 	DEV_DATABASE_URL,
// 	PROD_DATABASE_URL,
// 	ENVIROMENT
// } = process.env

// const connectToDatabase = async () => {
// 	const DATABASE_URL = ENVIROMENT === 'DEVELOPMENT' ? DEV_DATABASE_URL : PROD_DATABASE_URL
// 	try {
// 		await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
// 		console.log('✔️  SUCESSFULLY CONNECTED TO DATABASE..')
// 	} catch (error) {
// 		console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE DATABASE..')
// 		process.exit()
// 	}

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