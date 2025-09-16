import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const IndexPage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes");
      if (res.data.data) {
        setNotes(res.data.data);
      } else {
        setNotes(res.data);
      }
    } catch (err) {
      console.error("❌ Failed to fetch notes:", err);
      alert("⚠️ Could not fetch notes. Check backend.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back(); // safer for SPAs
    } else {
      window.close(); // fallback
    }
  };

  if (!notes.length)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black">
        <p className="text-purple-300 text-xl animate-pulse">Loading notes...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black sm:p-4 md:p-6 overflow-y-auto">
      {notes.map((note, index) => (
        <motion.div
          key={note._id || index}
          className="w-full min-h-screen flex flex-col justify-start items-center text-center pt-24 px-6 sm:px-10 md:px-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
        >
          {/* Fixed Title + Close Button */}
          <div className="fixed top-6 left-0 w-full text-center z-10 flex justify-between items-center px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-300 drop-shadow-[0_0_12px_#9333ea] flex-1 text-center">
              {note.title}
            </h2>
            <button
              onClick={handleClose}
              className="ml-4 bg-purple-700/40 hover:bg-purple-600/60 text-white font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition"
            >
              ✕
            </button>
          </div>

          {/* Note content */}
          <div className="mt-20 w-full max-w-4xl bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-700">
            <p className="text-purple-100 text-lg sm:text-xl md:text-2xl whitespace-pre-wrap leading-relaxed">
              {note.detail}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default IndexPage;
