import mongoose from "mongoose";

const rolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    permission_of_information: {
      type: Boolean,
      default: true,
      required: true,
    },

    permission_Warehouse: {
        type: Boolean,
        default: true,
        required: true,
    },

    permission_Summary: {
        type: Boolean,
        default: true,
        required: true,
    },

    permission_of_Office: {
        type: Boolean,
        default: true,
        required: true,
    },
    permission_of_all_Agencys: {
      type: Boolean,
      default: true,
      required: true,
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

export default mongoose.model("Rol",rolSchema);