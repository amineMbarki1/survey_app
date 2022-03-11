import { useState, useEffect } from 'react';
import { Container, Alert, Slide } from '@mui/material';

const MyAlert = ({ severity, message, children }) => {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, []);

  return (
    <Container maxWidth="xs" sx={{ position: 'fixed', bottom: '2rem' }}>
      <Slide direction="up" in={alert}>
        <Alert severity={severity || 'success'}>{message}</Alert>
      </Slide>
    </Container>
  );
};

export default MyAlert;
