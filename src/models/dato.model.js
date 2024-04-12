import mongoose from "mongoose";

const datoSchema = new mongoose.Schema(
  {
    hora: {
      type: Number,
      required: true,
    },

    cliente: {
      type: Number,
      required: true,
    },
    producto: {
      type: Number,
      required: true,
    },
    nombre_producto: {
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

export default mongoose.model("Dato", datoSchema);
