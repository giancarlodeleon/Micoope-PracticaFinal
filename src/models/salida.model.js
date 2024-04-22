import mongoose from "mongoose";

const salidaSchema = new mongoose.Schema(
  {

    agencia: {
      type: String,
      required: true,
    },


    tipo: {
        type: String,
        required: true,
      },

    serie: {
      type: String,
      required: true,
    },

    cantidad: {
      type: Number,
      required: true,
    },

    de: {
      type: Number,
      required: false,
    },

    hasta: {
        type: Number,
        required: false,
    },

    comentario: {
        type: String,
        required: true,
    },

    fecha: {
        type: Date,
        default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Salida",salidaSchema);
