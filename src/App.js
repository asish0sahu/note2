import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./components/features/note";
import Modal from "./components/Modal/modal";
import { openModal } from "./components/store/notesSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddNote = () => {
    dispatch(openModal());
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <h1>Sticky Notes App</h1>
      <button onClick={handleAddNote} className="add-button">
        +
      </button>

      <div className="note-list">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} setIsModalOpen={false} />
    </div>
  );
};

export default App;
