import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    
    nit: {
      type: Number,
      required: true,
      unique: true,
    },

    nombre: {
      type: String,
      required: true,
    },

    empresa: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    direccion: {
      type: String,
      required: true,
    },

    telefono: {
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

export default mongoose.model("Proveedor", proveedorSchema);
