import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = Schema({
	title: {
		type: String,
		unique: true, //TODO: Not working?
		require: true,
	},
	price: {
		type: Number,
		require: true
	},
	quantity: {
		type: Number,
		require: true
	},
	totalSold: {
		type: Number
	},
	productCategoryName: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'productcategory',
		required: true
	},
	productBrandName: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'productbrand',
		required: true
	}
}, { timestamps: true })


export const productToPaypalModel = (product) => ({
	reference_id: product._id,
	"unit_amount": {
		"currency_code": "SEK",
		"value": product.price
	},
  "tax": {
			"currency_code": "SEK",
			"value": "0.00" // TODO: fixme
	},
	sku: product._id,
	name: product.name || "Unknown",
  description: product.name || "Unknown",
	quantity: 1,
  categhory: product.productCategoryName || "Unknown",
	currency: 'SEK'
});

const ProductModel = mongoose.model('product', productSchema)
export default ProductModel
