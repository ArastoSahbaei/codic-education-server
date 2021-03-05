import ProductBrand from '../models/ProductBrand.model.js'
import StatusCode from '../../configurations/StatusCode.js'

const createProductBrand = async (request, response) => {
	const productBrand = new ProductBrand({
		productBrandName: request.body.productBrandName,
		brandDescription: request.body.brandDescription,
		brandCountry: request.body.brandCountry
	})
	try {
		const databaseResponse = await productBrand.save()
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getAllProductBrands = async (request, response) => {
	try {
		const databaseResponse = await ProductBrand.find()
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	createProductBrand,
	getAllProductBrands,
}