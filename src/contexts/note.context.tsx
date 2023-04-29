import React, { createContext, useContext, useState, useCallback } from 'react';
import { Note } from '../types/Note/note.interface';
import { notes } from '../services/http.service';
import { useGeneralContext } from './GeneralContext';

interface NoteContextType {
  notesData: Note[];
  setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;
  newNote: string;
  setNewNote: React.Dispatch<React.SetStateAction<string>>;
  noteDialogIsOpen: boolean;
  noteDialogType: 'create' | 'update' | 'delete' | null;
  openNoteDialog: (type: 'create' | 'update' | 'delete') => void;
  closeNoteDialog: () => void;
  handleCreateNote: () => Promise<void>;
  handleUpdateNote: (
    id: string,
    title: string,
    content: string
  ) => Promise<void>;
  handleDeleteNote: (id: string) => Promise<void>;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

interface NoteProviderProps {
  children: React.ReactNode;
}

export const NoteProvider: React.FC = ({ children }: NoteProviderProps) => {
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [noteDialogIsOpen, setNoteDialogIsOpen] = useState<boolean>(false);
  const [noteDialogType, setNoteDialogType] = useState<
    'create' | 'update' | 'delete' | null
  >(null);

  const { handleFlash } = useGeneralContext();

  const openNoteDialog = useCallback((type: 'create' | 'update' | 'delete') => {
    setNoteDialogType(type);
    setNoteDialogIsOpen(true);
  }, []);

  const closeNoteDialog = useCallback(() => {
    setNoteDialogIsOpen(false);
  }, []);

  const handleCreateNote = useCallback(async () => {
    if (!newNote) return;
    const createdNote = await notes.create({
      title: newNote,
      content: newNote,
    });
    setNotesData([...notesData, createdNote.data]);
    setNewNote('');
    handleFlash('Note created successfully!');
    closeNoteDialog();
  }, [newNote, notesData, handleFlash, closeNoteDialog]);

  const handleUpdateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const updatedNote = await notes.update(id, { title, content });
      setNotesData(
        notesData.map((note) => (note.id === id ? updatedNote.data : note))
      );
      handleFlash('Note updated successfully!');
      closeNoteDialog();
    },
    [notesData, handleFlash, closeNoteDialog]
  );

  const handleDeleteNote = useCallback(
    async (id: string) => {
      await notes.delete(id);
      setNotesData(notesData.filter((note) => note.id !== id));
      handleFlash('Note deleted successfully!');
      closeNoteDialog();
    },
    [notesData, handleFlash, closeNoteDialog]
  );

  return (
    <NoteContext.Provider
      value={{
        notesData,
        setNotesData,
        newNote,
        setNewNote,
        noteDialogIsOpen,
        noteDialogType,
        openNoteDialog,
        closeNoteDialog,
        handleCreateNote,
        handleUpdateNote,
        handleDeleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};
