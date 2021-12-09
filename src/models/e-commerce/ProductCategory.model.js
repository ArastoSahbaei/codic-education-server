import mongoose from 'mongoose'
const { Schema } = mongoose

const productCategorySchema = Schema({
	productCategoryName: String,
	product: [{
		type: Schema.Types.ObjectId,
		ref: 'product',
	}]
}, { timestamps: true })

const ProductCategoryModel = mongoose.model('productcategory', productCategorySchema)
export default ProductCategoryModel