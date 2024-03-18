import mongoose from "mongoose";

const agenciaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      unique: true, 
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

export default mongoose.model("Agencia",agenciaSchema);