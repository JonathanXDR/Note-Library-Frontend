import {
  KebabHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import { ActionList, ActionMenu, IconButton } from '@primer/react';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';

function NoteCollectionActionMenu() {
  const { openNoteCollectionDialog } = useNoteCollectionContext();
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
              onSelect={() => openNoteCollectionDialog('update')}
            >
              <ActionList.LeadingVisual>
                <PencilIcon />
              </ActionList.LeadingVisual>
              Edit
              {/* <ActionList.TrailingVisual>⌘E</ActionList.TrailingVisual> */}
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
              onSelect={() => openNoteCollectionDialog('delete')}
            >
              <ActionList.LeadingVisual>
                <TrashIcon />
              </ActionList.LeadingVisual>
              Delete
              {/* <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual> */}
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </>
  );
}

export default NoteCollectionActionMenu;
