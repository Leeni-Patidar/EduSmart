import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },

    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    },


},{timestamps:true})


export const Modules = mongoose.model("Modules", moduleSchema)