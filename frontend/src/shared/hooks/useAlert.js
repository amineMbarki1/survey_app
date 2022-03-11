import { useState, useEffect } from 'react';

const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  const setAlert = ({ message, severity = 'success' }) => {
    setShowAlert(true);
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const disableAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
    setAlertSeverity('');
  };

  useEffect(() => {
    if (showAlert) setTimeout(disableAlert, 500);
  }, [showAlert]);

  return { setAlert, showAlert, alertMessage, alertSeverity, disableAlert };
};

export default useAlert;
