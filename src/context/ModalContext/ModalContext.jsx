import React, { useState, createContext } from 'react';

import Modal from '../../components/Modal';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    noLabel: '',
    yesLabel: '',
    onSubmit: () => {},
    child: <></>,
  });

  const openModal = (config) => {
    setModalConfig(config);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{
      openModal: openModal,
      closeModal: closeModal,
      ModalIsOpen: isOpen,
      modalConfig: modalConfig,
    }}>
      <Modal 
        open={isOpen}
        title={modalConfig.title || ''}
        noLabel={modalConfig?.noLabel || ''}
        yesLabel={modalConfig?.yesLabel || ''}
        onCancel={closeModal}
        onSubmit={modalConfig.onSubmit}
      >
        {modalConfig.child}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};