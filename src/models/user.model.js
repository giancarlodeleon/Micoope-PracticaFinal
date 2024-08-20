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

    telefono:{
        type: String,
        trim: true,
        required: true,
    },
    placa:{
        type: String,
        trim: true,
        required: true,
    },
    nit:{
        type: String,
        trim: true,
        required: true,
    },
    aplicable_comision:{
        type: Boolean,
        default: true,
        trim: true,
        required: true,
    },
    sueldo_base:{
        type: Number,
        trim: true,
        required: true,
    },
    bono:{
        type: Boolean,
        default: true,
        trim: true,
        required: true,
    },
    kilometraje:{
        type: Number,
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