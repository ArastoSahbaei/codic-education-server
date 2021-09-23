import { populateEmployees } from './data/employees.js'
import { populateProductBrands } from './data/productBrands.js'
import { populateProductCategories } from './data/productCategories.js'
import { populateCareerApplications } from './data/careers.js'
import { populateNewsLetterSubscriptions } from './data/newLetterSubscriptions.js'
import Configurations from '../Configurations.js'
import dotenv from 'dotenv'

export const populateDatabase = () => {
	populateEmployees()
	populateProductBrands()
	populateProductCategories()
	populateCareerApplications()
	populateNewsLetterSubscriptions()
}

const connectToDeveloperDB = () => {
	dotenv.config(process.env.DEV_DATABASE_URL && Configurations.connectToDatabase())
}

connectToDeveloperDB()
populateDatabase()
