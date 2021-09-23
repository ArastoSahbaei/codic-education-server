import ProductCategoryModel from "../../../src/models/ProductCategory.model.js"

export const productCCategoriesData =
	[
		{
			productCategoryName: 'Utbildare',
		},

		{
			productCategoryName: 'Utvecklare'

		},
		{
			productCategoryName: 'Kurser'

		},
		{
			productCategoryName: 'Gästföreläsare'

		},
		{
			productCategoryName: 'Utbildningspaket'

		},
		{
			productCategoryName: 'Kodstuga'

		},
		{
			productCategoryName: 'Videomaterial'

		},
		{
			productCategoryName: 'Böcker'
		}
	]

export const populateProductCategories = () => {
	productCCategoriesData.forEach(category => {
		try {
			ProductCategoryModel.insertMany(category)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
}