import { Container } from '@mui/material';
import { useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AuthContext from '../../shared/context/authContext';

const AuthPage = (props) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (authContext.isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <Container maxWidth="xs" component="main">
        {location.pathname === '/login' && <LoginForm />}0
        {location.pathname === '/register' && <RegisterForm />}
      </Container>
      <Container
        maxWidth="xs"
        sx={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'traslateX: -50%' }}
      ></Container>
    </>
  );
};

export default AuthPage;
