import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flash,
  FormControl,
  Heading,
  IconButton,
  PageLayout,
  TextInput,
  Text,
  Link,
} from '@primer/react';
import { StopIcon, XIcon } from '@primer/octicons-react';
import { handleLoginSubmit, handleCheckToken } from '../../utils/auth.util';
import LoadingSpinner from '../../components/LoadingSpinner';
import './PasswordResetPage.module.css';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';

const PasswordResetPage = () => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      handleCheckToken(token, navigate).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    setIsValid(
      !!username.trim() &&
        !!password.trim() &&
        !!confirmPassword.trim() &&
        password === confirmPassword &&
        isValidPassword(password)
    );
  }, [username, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLoginSubmit(username, password, navigate);
    navigate('/login');
  };

  function isValidPassword(password: string) {
    const hasNumber = /\d/;
    const hasLowercase = /[a-z]/;
    const minLengthWithRequirements = 8;
    const minLength = 15;

    if (password.length >= minLength) {
      return true;
    } else if (
      password.length >= minLengthWithRequirements &&
      hasNumber.test(password) &&
      hasLowercase.test(password)
    ) {
      return true;
    }
    return false;
  }

  function getColorAndWeight(validation: boolean) {
    return {
      color: validation ? 'success.fg' : 'danger.fg',
      fontWeight: validation ? '' : 'bold',
    };
  }

  function getMutedColor(condition: boolean) {
    return condition
      ? {
          color: 'fg.muted',
          fontWeight: '',
        }
      : {};
  }

  const validations = {
    minLength: password.length >= 15,
    minLengthWithRequirements:
      password.length >= 8 && /\d/.test(password) && /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasLowercase: /[a-z]/.test(password),
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <PageLayout.Header
        sx={{
          width: '100%',
          margin: 0,
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingTop: 5,
          paddingBottom: 4,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <LoginNavbar />
      </PageLayout.Header>
      <PageLayout.Content>
        <Box
          sx={{
            width: '340px',
            margin: '0 auto',
            paddingX: 3,
          }}
          id="login"
        >
          <Box
            sx={{
              margin: 0,
              padding: 0,
              marginBottom: 16,
              color: 'fg.default',
              textAlign: 'center',
              textShadow: 'none',
              backgroundColor: 'transparent',
              border: 0,
              borderRadius: '6px 6px 0 0',
            }}
          >
            <Heading
              as="h1"
              sx={{
                fontSize: 24,
                fontWeight: 300,
                letterSpacing: '-0.5px',
              }}
            >
              Reset your password
            </Heading>
          </Box>

          <Flash variant="danger">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                paddingX: 2,
              }}
            >
              <Text
                sx={{
                  marginRight: 3,
                }}
              >
                <StopIcon />
              </Text>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              >
                <Text
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  The following inputs have errors:
                </Text>
                <Box>
                  {/* Dynamically show all Input Titles, which the validation failed */}
                  <Text
                    sx={{
                      textDecoration: 'Underline',
                    }}
                  >
                    Last name
                  </Text>
                  ,{' '}
                  <Text
                    sx={{
                      textDecoration: 'Underline',
                    }}
                  >
                    ZIP code
                  </Text>
                  ,{' '}
                  <Text
                    sx={{
                      textDecoration: 'Underline',
                    }}
                  >
                    email address
                  </Text>
                </Box>
              </Box>
            </Box>
          </Flash>

          <Box
            as={'form'}
            onSubmit={handleSubmit}
            sx={{
              marginTop: 3,
              padding: 16,
              fontSize: 14,
              backgroundColor: 'canvas.subtle',
              border: '1px solid',
              borderColor: 'border.muted',
              borderRadius: 6,
            }}
          >
            <FormControl required>
              <FormControl.Label
                sx={{
                  marginBottom: 2,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
              >
                Enter your username
              </FormControl.Label>
              <TextInput
                type="text"
                loading={true}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                sx={{
                  marginTop: 1,
                  marginBottom: 4,
                  width: '100%',
                  paddingY: '5px',
                }}
              />
            </FormControl>
            <FormControl required>
              <FormControl.Label
                sx={{
                  marginBottom: 2,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
              >
                Enter your new password
              </FormControl.Label>
              <TextInput
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsValid(isValidPassword(e.target.value));
                }}
                placeholder="Enter password"
                sx={{
                  marginTop: 1,
                  marginBottom: 4,
                  width: '100%',
                  paddingY: '5px',
                }}
              />
            </FormControl>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <FormControl required>
                <FormControl.Label
                  sx={{
                    marginBottom: 2,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                >
                  Confirm your new password
                </FormControl.Label>
                <TextInput
                  type="password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    // setIsValid(isValidPassword(e.target.value));
                  }}
                  placeholder="Confirm password"
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
              </FormControl>
              <Text
                sx={{
                  color: 'fg.muted',
                  fontSize: '12px',
                }}
              >
                {/* Password description */}
                <Text as="p">
                  Make sure it's{' '}
                  <Text
                    sx={{
                      ...getColorAndWeight(validations.minLength),
                      ...getMutedColor(validations.minLengthWithRequirements),
                    }}
                  >
                    at least 15 characters
                  </Text>{' '}
                  OR{' '}
                  <Text
                    sx={{
                      ...getColorAndWeight(
                        validations.minLengthWithRequirements
                      ),
                      ...getMutedColor(validations.minLength),
                    }}
                  >
                    at least 8 characters
                  </Text>{' '}
                  <Text
                    sx={{
                      ...getColorAndWeight(validations.hasNumber),
                      ...getMutedColor(validations.minLength),
                    }}
                  >
                    including a number
                  </Text>{' '}
                  <Text
                    sx={{
                      ...getColorAndWeight(validations.hasLowercase),
                      ...getMutedColor(validations.minLength),
                    }}
                  >
                    and a lowercase letter
                  </Text>
                  .{' '}
                  <Link href="https://docs.github.com/articles/creating-a-strong-password">
                    Learn more
                  </Link>
                  .
                </Text>
              </Text>
              <FormControl required>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid}
                  block
                >
                  Reset password
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </PageLayout.Content>
      <PageLayout.Footer
        sx={{
          maxWidth: 1012,
          marginRight: 'auto',
          marginLeft: 'auto',

          paddingX: [16, 40, 40, 16],
          paddingY: 6,
          marginTop: 6,
          fontSize: '12px',
        }}
      >
        <LoginFooter />
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default PasswordResetPage;
