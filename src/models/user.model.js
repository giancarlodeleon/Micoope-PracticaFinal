import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        trim: true,
    },

    email:{
        type: String,
        required: true,
        trim: true,
        unique: true, 
    },

    password:{
        type: String,
        required: true,
    },

    rol:{
        type: String,
        trim: true,
        required: true,
    },
    agencia:{
        type: String,
        trim: true,
        required: true,
    },
    estado:{
        type: Boolean,
        default: true,
        trim: true,
        required: true,
    },
},{
},{
},{
    timestamps:true
})

export default mongoose.model('User', userSchema)