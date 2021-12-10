import mongoose from 'mongoose'
const { Schema } = mongoose

const productBrand = Schema({
	productBrandName: String,
	product: [{
		type: Schema.Types.ObjectId,
		ref: 'product',
	}],
	brandDescription: String,
	brandCountry: String

}, { timestamps: true })

const ProductBrandSchema = mongoose.model('productbrand', productBrand)
export default ProductBrandSchema