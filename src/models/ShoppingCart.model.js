import mongoose from 'mongoose'
const { Schema } = mongoose

const shoppingCart = Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	products: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
	}]
}, { timestamps: true })

const ShoppingCartSchema = mongoose.model('shoppingcart', shoppingCart)
export default ShoppingCartSchema

/*

cartId
productId
quantity
dateAdded

*/