import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    tipo: {
      type: String,
      required: true,
    },

    agencia: {
      type: String,
      required: true,
    },

    serie: {
      type: String,
      required: true,
    },

    de: {
      type: Number,
      required: false,
    },

    hasta:{
        type: Number,
        required: false,

    },

    total: {
        type: Number,
        required: true,
    },

    saldo: {
        type: Number,
        required: true,
    },

    usado: {
      type: Number,
      required: true,
      default: 0
  }

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Movimiento",movimientoSchema);
