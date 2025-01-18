import mongoose from "mongoose";

const solicitudSchema = new mongoose.Schema(
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

    estado: {
      type: Boolean,
      required: true,
      default: false,
    },

    cliente: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    dias_credito: {
      type: Number,
      required: false,
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

    observacion: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Solicitud", solicitudSchema);
