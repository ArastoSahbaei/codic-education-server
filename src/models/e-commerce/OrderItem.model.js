import mongoose from 'mongoose'
const { Schema } = mongoose

const orderItemSchema = Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const OrderItemModel = mongoose.model('orderItem', orderItemSchema)
export default OrderItemModel