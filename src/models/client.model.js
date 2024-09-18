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
      unique: true,
    },

    social: {
      type: String,
      required: false,
    },

    department: {
      type: String,
      required: false,
    },

    municipio: {
      type: String,
      required: false,
    },

    direction: {
      type: String,
      required: false,
    },

    reference: {
      type: String,
      required: false,
    },

    phone: {
      type: Number,
      required: false,
    },

    plazo_credito: {
      type: String,
      required: false,
    },

    factura: {
      type: String,
      required: false,
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
