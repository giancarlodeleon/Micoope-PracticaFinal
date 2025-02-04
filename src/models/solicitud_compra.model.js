import mongoose from "mongoose";

const solicitud_compraSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
    },

    tipo: {
      type: String,
      required: true,
    },

    nombre: {
      type: String,
      required: true,
    },

    proveedor: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    nit: {
      type: Number,
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

export default mongoose.model("SolicitudCompra", solicitud_compraSchema);
