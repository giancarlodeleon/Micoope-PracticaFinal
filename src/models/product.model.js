import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    proveedor: {
      type: String,
      required: true,
    },

    presentation: {
      type: String,
      required: false,
    },

    cost_price: {
      type: Number,
      required: true,
    },

    selling_price_1: {
      type: Number,
      required: true,
    },
    selling_price_2: {
      type: Number,
      required: true,
    },
    selling_price_3: {
      type: Number,
      required: true,
    },
    minimum_stock: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    comision: {
      type: Boolean,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      red:'User',
      required: true
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product",productSchema);