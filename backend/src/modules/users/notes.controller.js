import {
  getAllNotesModel,
  getByIdNotesModel,
  createNotesModel,
  updateByIdNotesModel,
  deleteByIdNotesModel
} from "./notes.model.js";

export const getAllNotes = async (req, res) => {
  try {
    const data = await getAllNotesModel();
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving data", error: err.message });
  }
};

export const getByIdNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getByIdNotesModel(id);
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving data", error: err.message });
  }
};

export const createNotes = async (req, res) => {
  try {
    const body = req.body;
    const data = await createNotesModel(body);
    res.status(201).json({ message: "Data created successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Error creating data", error: err.message });
  }
};

export const updateByIdNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await updateByIdNotesModel(id, body);
    res.status(200).json({ message: "Data updated successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Error updating data", error: err.message });
  }
};

export const deleteByIdNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deleteByIdNotesModel(id);
    res.status(200).json({ message: "Data deleted successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Error deleting data", error: err.message });
  }
};
