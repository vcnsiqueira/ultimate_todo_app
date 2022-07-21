import React, { useEffect, useContext } from 'react';

import { ListsContainer } from './styled/Lists.styled';

import { ListsContext } from '../../context/ListsContext';
import { SnackbarContext } from '../../context/SnackbarContext';
import { ModalContext } from '../../context/ModalContext';

import ListsToolbar from '../../components/Toolbars/ListsToolbar';
import GridCards from  '../../components/GridCards';
import NewList from '../../components/Modals/NewList';

const Lists = () => {

  const { state, listsAPI } = useContext(ListsContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const { openModal, closeModal } = useContext(ModalContext);
  
  useEffect(() => {
    const { error, msg } = listsAPI.getLists();
    if (error) {
      openSnackbar(msg, {
        type: 'error',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    };
  }, []);

  const handleAddList = () => {
    const addList = async (newList) => {
      const { error, msg } = await listsAPI.addList(newList);
      openSnackbar(msg, {
        type: error ? 'error' : 'success',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    };

    openModal({
      title: 'Create New List',
      child: (
        <NewList
          createNewList={addList}
          close={closeModal}
        />
      )
    });
  };

  const handleRemoveList = (id) => {
    const removeList = async () => {
      const { error, msg } = await listsAPI.removeList(id);
      if(!error) {
        closeModal();
      };
      openSnackbar(msg, {
        type: error ? 'error' : 'success',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    };

    openModal({
      title: 'Remove List',
      yesLabel: 'Remove',
      noLabel: 'Cancel',
      onCancel: closeModal,
      onSubmit: removeList,
      child: (
        <div>Are you sure you want to remove this list? This action can't be undone!</div>
      )
    });
  };

  const handleEditList = (id) => {

    const initialValue = state.lists.filter(list => list.id === id)[0];

    const editList = async (newData) => {
      const { error, msg } = await listsAPI.editList(id, newData);
      openSnackbar(msg, {
        type: error ? 'error' : 'success',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    };

    openModal({
      title: 'Edit List',
      child: (
        <NewList
          isEdit={true}
          initialValue={initialValue}
          editList={editList}
          close={closeModal}
        />
      )
    })
  };

  return (
    <ListsContainer>
      <ListsToolbar list={state.lists} addNewList={handleAddList}/>
      <GridCards list={state.lists} removeList={handleRemoveList} editList={handleEditList}/>
    </ListsContainer>
  );
};

export default Lists;