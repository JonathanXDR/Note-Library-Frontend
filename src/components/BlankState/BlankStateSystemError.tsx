import {
  AlertIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@primer/octicons-react';
import {
  Box,
  Button,
  Heading,
  Link,
  Text,
  useDetails,
  Popover,
  Details,
} from '@primer/react';

interface BlankStateSystemErrorProps {
  httpError?: any;
}

function BlankStateSystemError({ httpError }: BlankStateSystemErrorProps) {
  const { open, setOpen } = useDetails({ closeOnOutsideClick: false });

  const errorList = [
    { label: 'Message', key: 'message' },
    { label: 'Code', key: 'code' },
    { label: 'Stack', key: 'stack' },
    { label: 'Method', key: 'config.method' },
    { label: 'Headers', key: 'config.headers' },
    { label: 'Base URL', key: 'config.baseURL' },
    { label: 'URL', key: 'config.url' },
  ];

  const getValue = (key: string, error: any) => {
    const keys = key.split('.');
    let value = error;
    keys.forEach((k) => {
      value = value && value[k];
    });

    if (typeof value === 'object') {
      const expandableDetails = useDetails({ closeOnOutsideClick: false });

      return (
        <Details {...expandableDetails.getDetailsProps()}>
          <Link
            as="summary"
            sx={{
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline',
            }}
          >
            {expandableDetails.open ? (
              <ChevronDownIcon size={16} />
            ) : (
              <ChevronRightIcon size={16} />
            )}
          </Link>
          {expandableDetails.open &&
            Object.entries(value).map(([childKey, childValue], index) => (
              <div key={index}>
                <Text as="pre" color="default.fg" sx={{ display: 'inline' }}>
                  {'  '}
                </Text>
                <Text as="pre" color="default.fg" sx={{ display: 'inline' }}>
                  {childKey}:
                </Text>{' '}
                <Text
                  as="pre"
                  color="danger.fg"
                  sx={{
                    display: 'inline',
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {childValue as string}
                </Text>
              </div>
            ))}
        </Details>
      );
    }

    if (value.length > 50) {
      const expandableDetails = useDetails({ closeOnOutsideClick: false });

      return (
        <Details {...expandableDetails.getDetailsProps()}>
          <Link
            as="summary"
            sx={{
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline',
            }}
          >
            {expandableDetails.open ? (
              <ChevronDownIcon size={16} />
            ) : (
              <ChevronRightIcon size={16} />
            )}
          </Link>
          {expandableDetails.open && (
            <Text
              as="pre"
              color="danger.fg"
              sx={{
                display: 'inline',
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
              }}
            >
              {value}
            </Text>
          )}
        </Details>
      );
    }

    return (
      <Text
        as="pre"
        color="danger.fg"
        sx={{
          display: 'inline',
          whiteSpace: 'normal',
          overflowWrap: 'anywhere',
        }}
      >
        {value}
      </Text>
    );
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

            <Popover relative open={open} caret="top">
              <Popover.Content
                sx={{
                  width: ['100%', '75%', '50%'],
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  marginTop: 3,
                  padding: '16px',
                  borderColor: 'danger.fg',
                  textAlign: 'left',
                  '&:before': {
                    borderColor:
                      'transparent transparent rgb(248, 81, 73) !important',
                  },
                }}
              >
                {errorList.map((errorItem) => {
                  const value = getValue(errorItem.key, httpError);
                  if (!value) return null;
                  return (
                    <Box
                      key={errorItem.key}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 2,
                      }}
                    >
                      <Text as="pre" color="default.fg">
                        {errorItem.label}: {''}
                      </Text>
                      {value}
                    </Box>
                  );
                })}
              </Popover.Content>
            </Popover>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BlankStateSystemError;
