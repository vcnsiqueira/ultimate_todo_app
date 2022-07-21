import React, { useState, createContext } from 'react';

import Snackbar from '../../components/Snackbar';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarConfig, setSnackbarConfig] = useState({
    type: 'success',
    duration: 3000,
    position: 'bottom-right',
    variant: 'filled',
  });

  const openSnackbar = (msg, config) => {
    setMessage(msg);
    setSnackbarConfig(config);
    setIsOpen(true);
  };

  const closeSnackbar = () => {
    setMessage('');
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{
      openSnackbar: openSnackbar,
      closeSnackbar: closeSnackbar,
      snackbarIsOpen: isOpen,
      message: message,
      snackbarConfig: snackbarConfig,
    }}>
      <Snackbar 
        open={isOpen}
        type={snackbarConfig.type || 'success'}
        duration={snackbarConfig.duration || 2000}
        position={snackbarConfig.position || 'bottom-right'}
        variant={snackbarConfig.variant || 'filled'}
        handleClose={closeSnackbar}
      >
        {message}
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};