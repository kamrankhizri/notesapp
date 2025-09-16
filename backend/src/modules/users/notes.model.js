import NotesModel from "./notes.schema.js";

export const getAllNotesModel = async () => {
  return NotesModel.find({});
};

export const getByIdNotesModel = async (id) => {
  return NotesModel.findById(id);
};

export const createNotesModel = async (body) => {
  return NotesModel.create(body);
};

export const deleteByIdNotesModel = async (id) => {
  return NotesModel.findByIdAndDelete(id);
};

export const updateByIdNotesModel = async (id, body) => {
  return NotesModel.findByIdAndUpdate(id, { $set: body }, { new: true });
};
