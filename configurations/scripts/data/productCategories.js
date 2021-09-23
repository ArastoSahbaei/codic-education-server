import ProductCategoryModel from "../../../src/models/ProductCategory.model.js"

export const categoryData =
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
	categoryData.forEach(category => {
		try {
			ProductCategoryModel.insertMany(category)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
}