import React, { createContext, useContext, useState } from 'react';
import { Note } from '../types/Note/note.interface';
import { NoteCollection } from '../types/NoteCollection/noteCollection.interface';
import { notes, noteCollections } from '../services/http.service';

interface GeneralContextType {
  fetchAllData: () => Promise<void>;
  flashVisible: boolean;
  flashMessage: string;
  handleFlash: (message: string) => void;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider: React.FC = ({ children }) => {
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [noteCollectionsData, setNoteCollectionsData] = useState<
    NoteCollection[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [flashVisible, setFlashVisible] = useState<boolean>(false);
  const [flashMessage, setFlashMessage] = useState<string>('');

  const fetchAllData = async () => {
    const allNotesResponse = await notes.getAll();
    setNotesData(allNotesResponse.data);

    const allNoteCollectionsResponse = await noteCollections.getAll();
    setNoteCollectionsData(allNoteCollectionsResponse.data);

    setLoading(false);
  };

  const handleFlash = (message: string) => {
    setFlashMessage(message);
    setFlashVisible(true);

    setTimeout(() => {
      setFlashVisible(false);
    }, 10000);
  };

  return (
    <GeneralContext.Provider
      value={{
        fetchAllData,
        flashVisible,
        flashMessage,
        handleFlash,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext must be used within a GeneralProvider');
  }
  return context;
};
