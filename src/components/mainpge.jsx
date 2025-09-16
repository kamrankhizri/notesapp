import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  detail: yup.string().required("Details are required"),
});

const Mainpage = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchNotes = async () => {
    try {
      const result = await axios.get("http://localhost:5000/notes");
      if (Array.isArray(result.data.data)) setNotes(result.data.data);
      else setNotes([]);
    } catch (error) {
      alert("⚠️ Failed to fetch notes. Check your backend.");
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/notes", data);
      await fetchNotes();
      reset();
      setShowForm(false);
    } catch (error) {
      alert("⚠️ Failed to add note. Check backend.");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("🗑️ Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
      alert("⚠️ Failed to delete note. Check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-purple-300 mb-10 drop-shadow-[0_0_12px_#9333ea]">
          📝 My Notes
        </h2>

        <div className="space-y-8">
          <AnimatePresence>
            {notes.length > 0 ? (
              notes.map((note) => (
                <motion.div
                  key={note._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="w-full bg-black/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl border border-purple-700 hover:scale-105 transition-transform cursor-pointer"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-200">
                    {note.title}
                  </h3>
                  
                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      onClick={() => navigate(`/details/${note._id}`)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center text-lg">No notes found.</p>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-5 rounded-full shadow-2xl hover:bg-purple-700 transition-transform transform hover:scale-110"
        >
          ➕
        </button>

        <AnimatePresence>
          {showForm && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-purple-700"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-purple-200">
                  Add a New Note
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block font-medium mb-1 text-purple-300">Title</label>
                    <input
                      {...register("title")}
                      className="w-full p-3 border border-purple-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter note title"
                    />
                    <p className="text-red-400 text-sm">{errors.title?.message}</p>
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-purple-300">Details</label>
                    <textarea
                      {...register("detail")}
                      rows="4"
                      className="w-full p-3 border border-purple-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter note details"
                    />
                    <p className="text-red-400 text-sm">{errors.detail?.message}</p>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Mainpage;
