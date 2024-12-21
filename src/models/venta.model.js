import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
      unique: true,
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

    solicitud: {
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
      type: String,
      required: false,
    },
    
    cliente: {
      type: String,
      required: true,
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
