import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
    },

    numero_factura: {
      type: Number,
      required: true,
    },

    FEL_serie: {
      type: String,
      required: true,
    },

    FEL_numero: {
      type: Number,
      required: true,
    },

    monto: {
      type: Number,
      required: true,
    },

    pendiente: {
      type: Number,
      required: true,
    },
    fecha_pago: {
      type: Date,
      required: false,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      red: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Venta", ventaSchema);
