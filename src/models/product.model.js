import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    precio_compra: {
      type: Number,
      required: true,
    },

    precio_venta: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product",productSchema);