import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost/modelacion');
        console.log("Db is connected")
    } catch (error) {
        console.log(error)
    }


};