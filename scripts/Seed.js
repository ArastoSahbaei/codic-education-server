import employees from '../src/models/Employee.model.js'
import { employeeList } from './data/employees.js'
import ProductCategoryModel from '../src/models/ProductCategory.model.js'
import {categoryList} from './data/productCategories.js'
import {brandList} from './data/productBrands.js'
import ProductBrandModel from '../src/models/ProductBrand.model.js'
import CareerModel from '../src/models/Career.model.js'
import { careerList } from './data/careers.js'


const seedToDatabase = async () => {

	employeeList.forEach(employee => {
		try {
			 employees.insertMany(employee)
				.then(console.log(employee))
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
	brandList.forEach(brand => {
		try {
			ProductBrandModel.insertMany(brand)
				.then(console.log(brand))
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
	categoryList.forEach(category => {
		try {
			ProductCategoryModel.insertMany(category)
				.then(console.log(category))
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})	 
	careerList.forEach(career => {
		try {
			CareerModel.insertMany(career)
				.then(console.log(career))
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})	 

}

	export default {
		seedToDatabase,
	}
