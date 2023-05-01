import React, { useEffect } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileDirectoryIcon,
  NoteIcon,
} from '@primer/octicons-react';
import { Box, Button, ButtonGroup, PageLayout, TreeView } from '@primer/react';

import { Note } from '../../types/note.interface';
import { NoteCollection } from '../../types/noteCollection.interface';
import { useGeneralContext } from '../../contexts/general.context';
import { useNoteContext } from '../../contexts/note.context';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';

import MainNavbar from '../../components/Navbar/MainNavbar';
import GeneralFlash from '../../components/Flash/GeneralFlash';
import NoteItem from '../../components/Note/NoteItem';
import NoteCollectionItem from '../../components/NoteCollection/NoteCollectionItem';
import NoteDialog from '../../components/Note/NoteDialog';
import NoteCollectionDialog from '../../components/NoteCollection/NoteCollectionDialog';
import BlankStateEmpty from '../../components/BlankState/BlankStateEmpty';

import './HomePage.module.css';

const HomePage: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { notesData, noteCollectionsData, fetchAllData } = useGeneralContext();
  const { noteDialogIsOpen, openNoteDialog } = useNoteContext();

  const { noteCollectionDialogIsOpen, openNoteCollectionDialog } =
    useNoteCollectionContext();

  useEffect(() => {
    fetchAllData();
  }, [notesData, noteCollectionsData]);

  const renderFilteredNoteItems = () =>
    notesData
      .filter((note: Note) => !note.noteCollectionId)
      .map((note: Note) => <NoteItem note={note} />);

  const renderFilteredNoteItemTrees = (filteredNotes: Note[]) =>
    filteredNotes.map((note) => (
      <TreeView.Item id={note.id}>
        <TreeView.LeadingVisual>
          <NoteIcon size={16} />
        </TreeView.LeadingVisual>
        <NoteItem note={note} />
      </TreeView.Item>
    ));

  const renderNoteCollections = () =>
    noteCollectionsData.map((noteCollection: NoteCollection) => {
      const filteredNotes = notesData.filter(
        (note: Note) => note.noteCollectionId === noteCollection.id
      );

      return (
        <TreeView.Item
          id={noteCollection.id}
          expanded={expanded.includes(noteCollection.id)}
          onExpandedChange={(isExpanded: boolean) => {
            if (isExpanded) {
              setExpanded((prevExpanded) => [
                ...prevExpanded,
                noteCollection.id,
              ]);
            } else {
              setExpanded((prevExpanded) =>
                prevExpanded.filter((id) => id !== noteCollection.id)
              );
            }
          }}
        >
          <TreeView.LeadingVisual>
            <TreeView.DirectoryIcon />
          </TreeView.LeadingVisual>
          <NoteCollectionItem noteCollection={noteCollection} />
          <TreeView.SubTree>
            {renderFilteredNoteItemTrees(filteredNotes)}
          </TreeView.SubTree>
        </TreeView.Item>
      );
    });

  return (
    <>
      {noteDialogIsOpen && <NoteDialog />}
      {noteCollectionDialogIsOpen && <NoteCollectionDialog />}
      <PageLayout containerWidth="full" padding="none">
        <PageLayout.Header>
          <MainNavbar />
          <GeneralFlash />
        </PageLayout.Header>
        <PageLayout.Content padding="normal" width="xlarge">
          {!notesData.length && !noteCollectionsData.length ? (
            <BlankStateEmpty />
          ) : (
            <>
              {/* <UnderlineNavItem /> */}
              <TreeView aria-label="Files">
                <Box sx={{ marginTop: 5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap-reverse',
                      }}
                    >
                      <ButtonGroup
                        sx={{
                          marginRight: '3',
                          marginBottom: '3',
                        }}
                      >
                        <Button
                          trailingIcon={
                            expanded.length > 0
                              ? ChevronDownIcon
                              : ChevronRightIcon
                          }
                          onClick={() =>
                            setExpanded(
                              expanded.length > 0
                                ? []
                                : noteCollectionsData.map(
                                    (noteCollection: NoteCollection) =>
                                      noteCollection.id
                                  )
                            )
                          }
                        >
                          {expanded.length > 0 ? 'Collapse' : 'Expand'} All
                        </Button>
                      </ButtonGroup>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Button
                          leadingIcon={NoteIcon}
                          variant="primary"
                          onClick={() => openNoteDialog('create')}
                          sx={{
                            marginRight: '3',
                            marginBottom: '3',
                          }}
                        >
                          Create Note
                        </Button>
                        <Button
                          leadingIcon={FileDirectoryIcon}
                          variant="default"
                          onClick={() => openNoteCollectionDialog('create')}
                          sx={{
                            marginBottom: '3',
                          }}
                        >
                          Create NoteCollection
                        </Button>
                      </Box>
                    </Box>
                    {renderNoteCollections()}
                    {renderFilteredNoteItems()}
                  </Box>
                </Box>
              </TreeView>
            </>
          )}
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default HomePage;
