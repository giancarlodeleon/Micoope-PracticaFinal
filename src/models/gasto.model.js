import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    precio: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },


  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gasto",gastoSchema);