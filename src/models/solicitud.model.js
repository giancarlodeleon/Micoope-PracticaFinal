import mongoose from "mongoose";

const solicitudSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true, 
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

export default mongoose.model("Solicitud", solicitudSchema);
