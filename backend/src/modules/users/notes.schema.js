import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  detail: { type: String,  required: true}
});


const NotesModel = mongoose.model("Notes", NotesSchema);

export default NotesModel;
