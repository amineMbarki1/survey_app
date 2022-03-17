import { Container, Alert, Slide } from '@mui/material';
import { useEffect } from 'react';

const MyAlert = ({ severity, message, isShown, disbaleAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      disbaleAlert();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      clearTimeout(timeout);
    };
  }, [disbaleAlert]);

  return (
    <Container maxWidth="xs" sx={{ position: 'fixed', bottom: '2rem', zIndex: isShown ? 10 : 0 }}>
      <Slide direction="up" in={isShown}>
        <Alert severity={severity}>{message}</Alert>
      </Slide>
    </Container>
  );
};

export default MyAlert;
