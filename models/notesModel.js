import mongoose from "mongoose";

const schema = mongoose.Schema({
    title:String,
    createdAt:{type:Date, default:Date.now}
})

const notesModel = mongoose.model("notesModel", schema);

export default notesModel;