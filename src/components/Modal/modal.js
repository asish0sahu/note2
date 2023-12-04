import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote, closeModal } from "../store/notesSlice";
import "./modal.css";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, currentNote } = useSelector((state) => state.notes.modal);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  const handleAddOrUpdateNote = () => {
    if (currentNote) {
      dispatch(editNote({ ...currentNote, title, description }));
    } else {
      dispatch(addNote({ title, description }));
    }

    dispatch(closeModal());
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={() => dispatch(closeModal())}>
          &times;
        </span>
        <div className="popup-container">
          <form action="#">
            <h1 className="header">
              {currentNote ? "Edit Note" : "Add a Note"}
            </h1>
            <label htmlFor="noteTitle">Title:</label>
            <input
              type="text"
              id="noteTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a note"
              className="input-box"
            />
            <label htmlFor="noteDescription">Description:</label>
            <textarea
              id="noteDescription"
              value={description}
              placeholder="Enter note description"
              onChange={(e) => setDescription(e.target.value)}
              className="input-box"
            />
            <button onClick={handleAddOrUpdateNote} className="btn1">
              {currentNote ? "Update Note" : "Add Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
