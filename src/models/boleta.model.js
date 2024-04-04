import mongoose from "mongoose";

const boletaSchema = new mongoose.Schema(
  {
    tipo_boleta: {
      type: String,
      required: true,
    },

    serie: {
      type: String,
      required: true,
    },

    de: {
      type: Number,
      required: true,
    },

    hasta: {
      type: Number,     
      required: true,
    },

    existencia: {
        type: Number,
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

export default mongoose.model("Boleta",boletaSchema);