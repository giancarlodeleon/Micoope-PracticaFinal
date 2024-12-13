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
