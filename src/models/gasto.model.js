import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: false,
    },

    precio: {
        type: Number,
        required: true,
      },

    date: {
      type: Date,
      default: Date.now,
    },

    factura: {
      type: String,
      required: true,
    },

    tipo: {
      type: String,
      required: true,
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

export default mongoose.model("Gasto", gastoSchema);
