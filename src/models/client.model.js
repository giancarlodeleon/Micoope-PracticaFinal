import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
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

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    social: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    municipio: {
      type: String,
      required: true,
    },

    direction: {
      type: String,
      required: true,
    },

    reference: {
      type: String,
      required: false,
    },

    phone: {
      type: Number,
      required: true,
    },

    plazo_credito: {
      type: String,
      required: true,
    },

    factura: {
      type: String,
      required: true,
    },

    nota: {
      type: String,
      required: false,
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

export default mongoose.model("Client", clientSchema);
