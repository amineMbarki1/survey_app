import { useState } from 'react';

const useAlert = () => {
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const showAlert = ({ message, severity }) => {
    setSeverity(severity);
    setMessage(message);
    disableAlert();
    setIsShown(true);
  };

  const disableAlert = () => {
    setIsShown(false);
  };

  return { isShown, showAlert, disableAlert, alertInfo: { message, severity } };
};

export default useAlert;
