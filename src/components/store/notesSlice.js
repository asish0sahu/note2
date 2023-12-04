import { createSlice } from "@reduxjs/toolkit";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    modal: {
      isOpen: false,
      currentNote: null,
    },
  },
  reducers: {
    addNote: (state, action) => {
      const { title, description } = action.payload;
      const newNote = {
        id: Date.now(),
        title,
        description,
        color: getRandomColor(),
      };
      state.notes.push(newNote);
    },
    editNote: (state, action) => {
      const { id, title, description } = action.payload;
      const index = state.notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], title, description };
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.currentNote = action.payload || null;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.currentNote = null;
    },
  },
});

export const { addNote, editNote, deleteNote, openModal, closeModal } =
  notesSlice.actions;
export default notesSlice.reducer;
