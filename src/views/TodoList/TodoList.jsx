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
      title: 'Create New Task',
      child: (
        <NewTodo
          createNewTodo={addTodo}
          close={closeModal}
        />
      )
    });
  }

  const handleDeleteTodo = async (todoId) => {
    const { error, msg } = await todosAPI.deleteTodo(id, todoId);
    if (error) {
      openSnackbar(msg, {
        type: 'error',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    } else {
      openSnackbar(msg, {
        type: 'success',
        duration: 3000,
        position: 'bottom-right',
        variant: 'filled',
      });
    };
  };
  
  return (
    <TodoListContainer>
      <TodosToolbar list={list[0]} tasks={state.todos} addTodo={handleAddTodo}/>
      <TaskList tasks={state.todos} deleteTodo={handleDeleteTodo} />
    </TodoListContainer>
  );
};

export default TodoList;