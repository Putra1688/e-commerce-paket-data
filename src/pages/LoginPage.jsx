import React from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/packages" replace />;
  }

  return <LoginForm />;
};

export default LoginPage;