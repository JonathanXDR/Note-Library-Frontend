import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@primer/css/index.scss';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import { checkConnection } from './services/http.service';
import BlankStateConnectionError from './components/BlankState/BlankStateBackendError';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage/SignUpPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const PasswordResetPage = React.lazy(
  () => import('./pages/PasswordResetPage/PasswordResetPage')
);

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkApi = async () => {
      const connectionStatus = await checkConnection();
      console.log(connectionStatus);
      setIsConnected(connectionStatus);
    };

    checkApi();
  }, []);

  return (
    <>
      {isConnected === false ? (
        <BlankStateConnectionError />
      ) : (
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/password_reset" element={<PasswordResetPage />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  );
};

export default App;
