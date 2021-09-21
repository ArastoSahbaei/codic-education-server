import employees from '../src/models/Employee.model.js'
import { employeeList } from './data/employees.js'
import users from '../src/models/User.model.js'
import { userList } from './data/users.js'
import {productList} from './data/products.js'
import products from '../src/models/Product.model.js'
import productCategories from '../src/models/ProductCategory.model.js'
import {categoryList} from './data/productCategories.js'
import {brandList} from './data/productBrands.js'
import ProductBrand from '../src/models/ProductBrand.model.js'


const seedToDatabase = async () => {

	// employeeList.forEach(employee => {
	// 	try {
	// 		 employees.insertMany(employee)
	// 			.then(console.log(employee))
	// 	} catch (error) {
	// 		console.log('Error occurred when seeding data to the database')
	// 	}
	// })
	// brandList.forEach(brand => {
	// 	try {
	// 		ProductBrand.insertMany(brand)
	// 			.then(console.log(brand))
	// 	} catch (error) {
	// 		console.log('Error occurred when seeding data to the database')
	// 	}
	// })
	// categoryList.forEach(category => {
	// 	try {
	// 		productCategories.insertMany(category)
	// 			.then(console.log(category))
	// 	} catch (error) {
	// 		console.log('Error occurred when seeding data to the database')
	// 	}
	// })
	// userList.forEach(user => {
	// 	try {
	// 		 users.insertMany(user)
	// 			.then(console.log(user))
	// 	} catch (error) {
	// 		console.log('Error occurred when seeding data to the database')
	// 	}
	// })
	
	productList.forEach(product => {
		try {
			 products.insertMany(product)
				.then(console.log(product))
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})

}

	export default {
		seedToDatabase,
	}
