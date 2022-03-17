import { createContext } from 'react';

const alertContext = createContext({
  isShown: false,
  message: '',
  severity: '',
  showAlert: () => {},
});

export default alertContext;
