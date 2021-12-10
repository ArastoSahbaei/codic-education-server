import mongoose from "mongoose";
const { Schema } = mongoose;

export const STATUS_ACCEPTED = 0;
export const STATUS_SHIPPED = 0;
export const STATUS_DELIVERED = 0;

const orderSchema = Schema(
  {
    paypalOrderId: {
      type: String,
      required: false,
    },
    paypalCaptureId: {
      type: String,
      required: false,
    },
    paypalAuthorizeId: {
      type: String,
      required: false,
    },
    paypalToken: {
      type: String,
      required: false
    },
    swishUuid: {
      type: String,
      required: false
    },
    swishPaymentReference: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      //required: true,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "product",
      //required: true,
    },
    orderItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem",
      required: true,
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    shipping:{
      fullName: {
        type: String,
        required: true
      },
      shippingAdress: {
        type: String,
        required: true,
      },
      shippingMethod: {
        type: String,
        required: true
      }
    },
    shippedAt: {
      type: Date,
    },
    status: {
      type: Number,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);


export default OrderModel;

/*
OrderId
dateCreated
dateShipped
Reference to User
OrderTotal
Status
*/
