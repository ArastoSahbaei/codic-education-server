import mongoose from 'mongoose'
const { Schema } = mongoose

const cartItem = Schema({
    product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
        required: true
	},
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
},{ timestamps: true })

const cartItemModel = mongoose.model("cartitem", cartItemSchema)
export default cartItemModel