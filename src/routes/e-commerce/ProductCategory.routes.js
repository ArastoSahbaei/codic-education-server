import ProductCategoryController from '../../controllers/e-commerce/ProductCategory.controller.js'


const routes = application => {
	application.post('/productcategory', ProductCategoryController.createProductCategory)
	application.get('/productcategory', ProductCategoryController.getAllProductsCategorys)
}

export default { routes }