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
  Details,
} from '@primer/react';

interface BlankStateSystemErrorProps {
  httpError?: any;
}

function BlankStateSystemError({ httpError }: BlankStateSystemErrorProps) {
  const { getDetailsProps } = useDetails({ closeOnOutsideClick: false });

  const errorList = [
    { key: 'message', label: 'Message' },
    { key: 'code', label: 'Code' },
    { key: 'stack', label: 'Stack' },
    { key: 'config.method', label: 'Method' },
    { key: 'config.headers.Authorization', label: 'Authorization' },
    { key: 'config.baseURL', label: 'Base URL' },
    { key: 'config.url', label: 'URL' },
  ];

  const getValue = (key: string, error: any) => {
    const keys = key.split('.');
    let value = error;
    keys.forEach((k) => {
      value = value && value[k];
    });
    return value;
  };

  const renderExpandableText = (text: string) => {
    const expandableDetails = useDetails({ closeOnOutsideClick: false });

    return (
      <Details {...expandableDetails.getDetailsProps()}>
        <Text as="pre" color={'default.fg'}>
          {text.slice(0, 50)}
        </Text>
        <Link as="summary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
          {expandableDetails.open ? (
            <ChevronDownIcon size={16} />
          ) : (
            <ChevronRightIcon size={16} />
          )}
        </Link>
        <Text
          as="pre"
          color={'default.fg'}
          sx={{ display: expandableDetails.open ? 'inline' : 'none' }}
        >
          {text.slice(50)}
        </Text>
      </Details>
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
            <Details {...getDetailsProps()}>
              <Link as="summary">Learn more</Link>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  marginTop: 3,
                  padding: '16px',
                  border: '1px solid',
                  borderColor: 'danger.fg',
                  borderRadius: '6px',
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
                      <Text as="pre" color={'default.fg'}>
                        {errorItem.label}: {''}
                      </Text>
                      {value.length > 50 ? (
                        renderExpandableText(value)
                      ) : (
                        <Text as="pre" color="danger.fg">
                          {value}
                        </Text>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Details>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BlankStateSystemError;
