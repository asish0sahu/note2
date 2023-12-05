import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, openModal, editNote } from "../store/notesSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./note.css";

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const handleEditNote = () => {
    dispatch(openModal(note));
    saveNotesToLocalStorage(
      notes.map((n) => (n.id === note.id ? editNote : n))
    );
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(note.id));
    saveNotesToLocalStorage(notes.filter((n) => n.id !== note.id));
  };

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="note-actions">
        <button onClick={handleEditNote}>
          <FaEdit />
        </button>
        <button onClick={handleDeleteNote}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Note;
