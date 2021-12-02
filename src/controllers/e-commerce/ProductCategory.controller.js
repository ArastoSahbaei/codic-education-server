import ProductCategoryModel from '../../models/e-commerce/ProductCategory.model.js'
import StatusCode from '../../../configurations/StatusCode.js'

const createProductCategory = async (request, response) => {
	const productCategory = new ProductCategoryModel({ productCategoryName: request.body.productCategoryName })
	try {
		const databaseResponse = await productCategory.save()
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getAllProductsCategorys = async (request, response) => {
	try {
		const databaseResponse = await ProductCategoryModel.find()
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	createProductCategory,
	getAllProductsCategorys,
}