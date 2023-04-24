import { AlertIcon } from '@primer/octicons-react';
import {
  Box,
  Button,
  Heading,
  Link,
  Text,
  TreeView,
  useDetails,
} from '@primer/react';

interface BlankStateSystemErrorProps {
  httpError?: any;
}

function BlankStateSystemError({ httpError }: BlankStateSystemErrorProps) {
  const { open, setOpen } = useDetails({ closeOnOutsideClick: false });

  const renderErrorTree = (key: string, value: any, idPrefix: string = '') => {
    if (value && typeof value === 'object') {
      return (
        <TreeView.Item key={idPrefix} id={`error-${idPrefix}`} expanded={true}>
          <Text
            as="pre"
            sx={{
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
            }}
          >
            {key}:{' '}
          </Text>
          <TreeView.SubTree>
            {Object.entries(value).map(([subKey, subValue], index) => {
              const newIdPrefix = idPrefix
                ? `${idPrefix}-${index}`
                : `${index}`;
              return renderErrorTree(subKey, subValue, newIdPrefix);
            })}
          </TreeView.SubTree>
        </TreeView.Item>
      );
    } else {
      return (
        <TreeView.Item key={idPrefix} id={`error-${idPrefix}`} expanded={false}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Text
              as="pre"
              sx={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
              }}
            >
              {key}:{' '}
            </Text>
            <Text
              as="pre"
              color="danger.fg"
              sx={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
              }}
            >
              {String(value)}
            </Text>
          </Box>
        </TreeView.Item>
      );
    }
  };

  return (
    <Box
      sx={{
        paddingX: ['0px', '10px', '20px', '40px'],
        paddingY: ['0px', '20px', '40px', '80px'],
      }}
    >
      <Box
        className="blankslate blankslate-large"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingY: '128px',
        }}
      >
        <AlertIcon size={64} className="blankslate-icon" />
        <Heading as="h3" className="blankslate-heading">
          There was an error.
        </Heading>
        <Text as="p">
          It seems like there was an error. Please check your internet
          connection and try again.
        </Text>
        <Box className="blankslate-action">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry connection
          </Button>
        </Box>
        {httpError && (
          <Box className="blankslate-action">
            <Link
              onClick={() => setOpen(!open)}
              sx={{
                cursor: 'pointer',
              }}
            >
              Learn more
            </Link>
            {open && (
              <TreeView.ErrorDialog
                title="Error Details"
                onRetry={() => window.location.reload()}
                onDismiss={() => setOpen(false)}
              >
                <Box
                  sx={{
                    maxHeight: '50vh',
                    overflowY: 'auto',
                  }}
                >
                  <TreeView>{renderErrorTree('Error', httpError)}</TreeView>
                </Box>
              </TreeView.ErrorDialog>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BlankStateSystemError;
