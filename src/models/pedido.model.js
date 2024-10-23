import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    producto: {
      type: String,
      required: true,
    },

    cantidad: {
      type: Number,
      required: true,
    },

    total: {
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

export default mongoose.model("Pedido", pedidoSchema);
