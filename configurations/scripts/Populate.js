import { employeeList } from './data/employees.js'
import { newsLetterSubscriptionList } from './data/newLetterSubscriptions.js'
import { careerList } from './data/careers.js'
import {categoryList} from './data/productCategories.js'
import {brandList} from './data/productBrands.js'
import EmployeeModel from '../../src/models/Employee.model.js'
import NewsLetterSubscriptionModel from '../../src/models/NewsLetterSubscription.model.js'
import CareerModel from '../../src/models/Career.model.js'
import ProductCategoryModel from '../../src/models/ProductCategory.model.js'
import ProductBrandModel from '../../src/models/ProductBrand.model.js'




export const populateDatabase = async () => {

	employeeList.forEach(employee => {
		try {
			EmployeeModel.insertMany(employee)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
	brandList.forEach(brand => {
		try {
			ProductBrandModel.insertMany(brand)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
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
