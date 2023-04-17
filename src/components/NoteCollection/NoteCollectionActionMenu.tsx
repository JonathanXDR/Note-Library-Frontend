import {
  KebabHorizontalIcon,
  PencilIcon,
  ArchiveIcon,
  TrashIcon,
  UnlinkIcon,
} from '@primer/octicons-react';
import {
  ActionList,
  ActionMenu,
  ConfirmationDialog,
  IconButton,
} from '@primer/react';
import NoteCollectionDialog from './NoteCollectionDialog';
import { useNoteCollectionDialog } from '../../utils/noteCollection.util';

function NoteCollectionActionMenu({ noteCollection }: any) {
  const {
    handleNoteCollectionDialog,
    noteCollectionDialogIsOpen,
    noteCollectionDialogType,
  } = useNoteCollectionDialog();
  return (
    <>
      <ActionMenu>
        <ActionMenu.Anchor>
          <IconButton
            icon={KebabHorizontalIcon}
            variant="invisible"
            aria-label="Open column options"
          />
        </ActionMenu.Anchor>

        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item
              onSelect={() => handleNoteCollectionDialog('update')}
            >
              <ActionList.LeadingVisual>
                <PencilIcon />
              </ActionList.LeadingVisual>
              Edit
              <ActionList.TrailingVisual>⌘E</ActionList.TrailingVisual>
            </ActionList.Item>
            {/* <ActionList.Item onSelect={() => alert('Detach clicked')}>
            <ActionList.LeadingVisual>
              <UnlinkIcon />
            </ActionList.LeadingVisual>
            Detach notes
            <ActionList.TrailingVisual>⌘F</ActionList.TrailingVisual>
          </ActionList.Item> */}
            {/* <ActionList.Divider /> */}
            <ActionList.Item
              variant="danger"
              onSelect={() => handleNoteCollectionDialog('delete')}
            >
              <ActionList.LeadingVisual>
                <TrashIcon />
              </ActionList.LeadingVisual>
              Delete
              <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual>
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
      {noteCollectionDialogIsOpen && noteCollectionDialogType !== 'delete' && (
        <NoteCollectionDialog
          key={noteCollection.id}
          noteCollection={noteCollection}
        />
      )}

      {noteCollectionDialogIsOpen && noteCollectionDialogType === 'delete' && (
        <ConfirmationDialog
          title="Confirm action?"
          onClose={() => handleNoteCollectionDialog()}
        >
          Are you sure you want to delete this note?
        </ConfirmationDialog>
      )}
    </>
  );
}

export default NoteCollectionActionMenu;
