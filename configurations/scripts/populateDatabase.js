import { populateEmployees } from './data/employees.js'
import { populateProductBrands } from './data/productBrands.js'
import { populateProductCategories } from './data/productCategories.js'
import { populateCareerApplications } from './data/careers.js'
import { newsLetterSubscriptionList } from './data/newLetterSubscriptions.js'
import NewsLetterSubscriptionModel from '../../src/models/NewsLetterSubscription.model.js'
import Configurations from '../Configurations.js'
import dotenv from 'dotenv'

export const populateDatabase = () => {
	populateEmployees()
	populateProductBrands()
	populateProductCategories()
	populateCareerApplications()
	newsLetterSubscriptionList.forEach(newsLetterSubscription => {
		try {
			NewsLetterSubscriptionModel.insertMany(newsLetterSubscription)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})

}

const connectToDeveloperDB = () => {
	dotenv.config(process.env.DEV_DATABASE_URL && Configurations.connectToDatabase())
}

connectToDeveloperDB()
populateDatabase()
