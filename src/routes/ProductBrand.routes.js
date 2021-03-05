import ProductBrandController from '../controllers/ProductBrand.controller.js'

const routes = application => {
	application.post('/productbrand', ProductBrandController.createProductBrand)
	application.get('/productbrand', ProductBrandController.getAllProductBrands)
}

export default { routes }