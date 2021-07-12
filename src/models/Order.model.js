import mongoose from "mongoose";
const { Schema } = mongoose;

export const STATUS_ACCEPTED = 0;
export const STATUS_SHIPPED = 0;
export const STATUS_DELIVERED = 0;

const orderSchema = Schema(
  {
    paypalOrderId: {
      type: String,
      require: false,
    },
    paypalCaptureId: {
      type: String,
      require: false,
    },
    paypalAuthorizeId: {
      type: String,
      require: false,
    },
    price: {
      type: Number,
      require: true,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
