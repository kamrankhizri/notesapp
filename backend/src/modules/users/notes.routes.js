import express from "express";
import {
  getAllNotes,
  getByIdNotes,
  createNotes,
  updateByIdNotes,
  deleteByIdNotes
} from "./notes.controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getByIdNotes);
router.post("/", createNotes);
router.put("/:id", updateByIdNotes);
router.delete("/:id", deleteByIdNotes);

export default router;
