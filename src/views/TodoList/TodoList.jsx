import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TodoListContainer } from './styled/TodoList.styled';

import { ListsContext } from '../../context/ListsContext';
import { TodosContext } from '../../context/TodosContext';
import { SnackbarContext } from '../../context/SnackbarContext';
import { ModalContext } from '../../context/ModalContext';

import TodosToolbar from '../../components/Toolbars/TodosToolbar';
import TaskList from '../../components/TaskList';
import NewTodo from '../../components/Modals/NewTodo';
import { convertToTimestamp } from '../../configs/firebase/firebaseConfig';

const TodoList = () => {
  
  const { id } = useParams();
  const { state: lists, listsAPI } = useContext(ListsContext);
  const { state, todosAPI } = useContext(TodosContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const { openModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    const { error, msg } = todosAPI.getTodos(id);
    if (error) {
      openSnackbar(msg, {
        type: 'error',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    };
  },[todosAPI]);

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
  }, [listsAPI]);
  
  const list = lists.lists.filter((l) => { return l.id === id });

  const handleAddTodo = () => {
    const addTodo = async (newTodo) => {
      const { error, msg } = await todosAPI.addTodo(id, newTodo);
      openSnackbar(msg, {
        type: error ? 'error' : 'success',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    };

    openModal({
      title: 'Create New Todo',
      child: (
        <NewTodo
          createNewTodo={addTodo}
          close={closeModal}
        />
      )
    });
  }

  const handleEditTodo = async (todoId) => {

    const initialValue = state.todos.filter(todo => todo.id === todoId)[0];

    const editTodo = async (newTodo) => {
      const { error, msg } = await todosAPI.editTodo(id, todoId, newTodo);
      openSnackbar(msg, {
        type: error ? 'error' : 'success',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',        
      });
    };

    openModal({
      title: 'Edit Todo',
      child: (
        <NewTodo
          isEdit
          initialValue={initialValue}
          editTodo={editTodo}
          close={closeModal}
        />
      ),
    });
  };

  const handleToggleTodoDone = async (todoId) => {
    
    const { done } = state.todos.filter(todo => todo.id === todoId)[0];
    const newTodo = {
      done: !done,
      dateConclusion: !done ? convertToTimestamp(new Date()) : null,
    };
    const toggleMsg = !done ? 'Todo marked as done!' : 'Todo marked as not done!'
    
    const { error, msg } = await todosAPI.editTodo(id, todoId, newTodo);
    openSnackbar(error ? msg : toggleMsg, {
      type: error ? 'error' : 'success',
      duration: 3000,
      position: 'bottom-right',
      variant: 'filled',        
    });
   };

  const handleDeleteTodo = async (todoId) => {
    const deleteTodo = async () => {
      const { error, msg } = await todosAPI.deleteTodo(id, todoId);
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
      title: 'Remove Todo',
      yesLabel: 'Remove',
      noLabel: 'Cancel',
      onCancel: closeModal,
      onSubmit: deleteTodo,
      child: (
        <div>Are you sure you want to remove this todo? This action can't be undone!</div>
      )
    });
  };
  
  return (
    <TodoListContainer>
      <TodosToolbar list={list[0]} tasks={state.todos} addTodo={handleAddTodo}/>
      <TaskList
        tasks={state.todos}
        deleteTodo={handleDeleteTodo}
        editTodo={handleEditTodo}
        toggleTodoDone={handleToggleTodoDone}
      />
    </TodoListContainer>
  );
};

export default TodoList;