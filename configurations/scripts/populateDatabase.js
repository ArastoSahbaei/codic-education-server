import { populateEmployees } from './data/employees.js'
import { populateProductBrands } from './data/productBrands.js'
import { newsLetterSubscriptionList } from './data/newLetterSubscriptions.js'
import { careerList } from './data/careers.js'
import { categoryList } from './data/productCategories.js'
import NewsLetterSubscriptionModel from '../../src/models/NewsLetterSubscription.model.js'
import CareerModel from '../../src/models/Career.model.js'
import ProductCategoryModel from '../../src/models/ProductCategory.model.js'
import Configurations from '../Configurations.js'
import dotenv from 'dotenv'

export const populateDatabase = () => {
	populateEmployees()
	populateProductBrands()
	categoryList.forEach(category => {
		try {
			ProductCategoryModel.insertMany(category)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
	careerList.forEach(career => {
		try {
			CareerModel.insertMany(career)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
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
