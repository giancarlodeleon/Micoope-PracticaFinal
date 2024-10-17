import mongoose from "mongoose";

const historialSchema = new mongoose.Schema(
    {
          
      tipo: {
        type: String,
        required: true,
      },

      descripcion: {
        type: String,
        required: true,
      },
  
      cantidad: {
        type: Number,
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
  
  export default mongoose.model("Historial", historialSchema);
  