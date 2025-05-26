import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://sougotasaha:bDgnTDyyZKAJ53Tf@cluster0.bqreig8.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}