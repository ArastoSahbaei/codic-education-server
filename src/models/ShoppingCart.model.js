import mongoose from 'mongoose'
const { Schema } = mongoose

const shoppingCart = Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	cartItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'cartitem',
	}],
}, { timestamps: true })

const ShoppingCartSchema = mongoose.model('shoppingcart', shoppingCart)
export default ShoppingCartSchema

/*

cartId
productId
quantity
dateAdded

*/