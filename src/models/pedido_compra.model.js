import mongoose from "mongoose";

const pedido_compraSchema = new mongoose.Schema(
  {
    solicitud: {
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

    presentacion: {
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

export default mongoose.model("PedidoCompra", pedido_compraSchema);
