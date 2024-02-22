import { createSlice } from "@reduxjs/toolkit";
import { original } from 'immer'

const initialState = {
  notes:[{
    id: "1",
    title: "Sample Note",
    content: "This is a sample note content.",
    createdAt: new Date().toISOString(),
  }],
  archivedNotes:[],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setAllNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      if(state.notes.length !== 0 )
      state.notes = [...state.notes, action.payload];
      else
      state.notes =action.payload;
    },
    deleteNote: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.filter((note) => note.id !== id);
    },
    deleteArchiveNote: (state, action) => {
      const id = action.payload;
      state.archivedNotes = state.archivedNotes.filter((note) => note.id !== id);
    },
    updateNotes: (state, action) => {
      const newNote = action.payload;
      const id = newNote._id;               
      const index = state.notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...newNote };
      }
      const ind = state.archivedNotes.findIndex((note) => note.id === id);
      if (ind !== -1) {
        state.archivedNotes[index] = { ...state.archivedNotes[index], ...newNote };
      }
    },
    archiveNote: (state, action) => {
      const id = action.payload;
      const noteToArchive = state.notes.find((note) => note.id === id);
      if (noteToArchive) {
        state.archivedNotes.push(noteToArchive);
        console.log(state.archivedNotes);
        state.notes = state.notes.filter((note) => note.id !== id);
      }
    },
    UnarchiveNote: (state, action) => {
      const id = action.payload;
      const noteToArchive = state.archivedNotes.find((note) => note.id === id);
      if (noteToArchive) {
        state.notes.push(noteToArchive);
        console.log(state.archivedNotes);
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== id
        );
      }
    },
    setArchiveNotes: (state, action) => {
      state.archivedNotes = action.payload;
    },
    clearNotes: (state) => {
      state.notes = [];
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNotes,
  clearNotes,
  setAllNotes,
  setArchiveNotes,
  archiveNote,
  deleteArchiveNote,
  UnarchiveNote,
} = noteSlice.actions;
export const selectAllNotes = (state) => state.notes.notes;
export const selectAllArchived = (state) => state.notes.archivedNotes;
export default noteSlice.reducer;
