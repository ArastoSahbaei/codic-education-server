import { populateProductBrands } from './data/productBrandData.js'
import { populateProductCategories } from './data/productCategories.js'
import { populateCareerApplications } from './data/careerApplicationData.js'
import { populateNewsLetterSubscriptions } from './data/newsLetterSubscriptionData.js'
import Configurations from '../Configurations.js'
import dotenv from 'dotenv'

export const populateDatabase = () => {
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
