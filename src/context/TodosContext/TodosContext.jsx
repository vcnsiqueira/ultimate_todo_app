import React, { createContext, useContext, useCallback, useMemo, useReducer } from 'react';
import { AuthContext } from '../AuthContext';
import { db } from '../../configs/firebase/firebaseConfig';
import { collection, doc, deleteDoc, getDoc, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import { order } from '../../utils/order';

const initialState = {
  isLoading: false,
  todos: [],
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'getTodos': {
      return {
        ...state,
        todos: order(action.todos, true, 'name'),
        isLoading: false,
      }
    }

    case 'addTodo': {
      const todos = order([...state.todos, action.newTodo], true, 'name');
      return {
        ...state,
        todos: todos,
        isLoading: false,
      }
    }

    case 'deleteTodo': {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.todoId),
        isLoading: false,
      }
    }

    case 'editTodo': {
      const todosArray = order(state.todos.map((todo) => {
        if (todo.id === action.todoId) {
          // const { name, dateTarget, priority } = action.newTodo;
          // return {
          //   ...todo,
          //   name,
          //   dateTarget,
          //   priority,
          // };
          const newTodo = {...todo, ...action.newTodo};
          return {
            ...todo,
            name: newTodo.name,
            dateTarget: newTodo.dateTarget,
            priority: newTodo.priority,
            done: newTodo.done,
            dateConclusion: newTodo.dateConclusion,
            createdAt: newTodo.createdAt,
          };
        }
        return todo;
      }), true, 'name');
      return {
        ...state,
        todos: todosArray,
        isLoading: false,
      }
    }

    case 'setIsLoading': {
      return {
        ...state, isLoading: action.isLoading,
      }
    }

  default:
    return state;
  };
};

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {

  const [state, dispatch] = useReducer(todosReducer, initialState);
  const { currentUser } = useContext(AuthContext);

  const setIsLoading = useCallback((l = true) => dispatch({ type: 'setIsLoading', isLoading: l }), []);

  //### This function gets all the todos of some specific list ###//
  const getTodos = useCallback( async (todoListId) => {
    try {
      let todos = [];
      const querySnapshot = await getDocs(collection(db, `users/${currentUser}/todolists/${todoListId}/tasks`));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          todos = [...todos, { ...doc.data(), id: doc.id }]; 
        });
        return { error: false, msg: '', todos: todos };
      } else {
        return { error: false, msg: 'User has no task registered yet!', raw: '' };
      };
    } catch (error) {
      return {
        error: true,
        msg: 'It was not possible the get the todos of this list. Please, verify your connection and try again!',
        raw: '',
      }
    }
  }, [currentUser]);

  //### Ths function creates a new todo ###//
  const addTodo = useCallback ( async (todoListId, newTodo) => {
    try {
      await addDoc(collection(db, `users/${currentUser}/todolists/${todoListId}/tasks`), newTodo)
      return {
        error: false,
        msg: 'New task successfully created!',
        raw: '',
      };
    } catch (error) {
      return {
        error: true,
        msg: 'Something went wrong! Please, verify your internet connection and try again!',
        raw: '',
      };
    };
  }, [currentUser]);

  //### This function deletes a todo ###//
  const deleteTodo = useCallback ( async (todoListId, todoId) => {
    try {
      const docRef = doc(db, `users/${currentUser}/todolists/${todoListId}/tasks`, todoId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) {
        return { error: true, msg: 'It was not possible to delete this task', raw: ''};
      } else {
        await deleteDoc(docRef)
        return { error: false, msg: 'Task deleted successfully', raw: ''};
      }
    } catch (error) {
      return { error: true, msg: 'It was not possible to delete this task', raw: error};
    };
  }, [currentUser]);

  const editTodo = useCallback ( async (todoListId, todoId, newTodo) => {
    try {
      await updateDoc(doc(db, `users/${currentUser}/todolists/${todoListId}/tasks/${todoId}`), newTodo);
      return {
        error: false,
        msg: 'Todo successfully updated!',
        raw: '',
      };
    } catch (error) {
      return {
        error: true,
        msg: 'Something went wrong! Please, verify your internet connection and try again!',
        raw: '',
      };
    };
  }, [currentUser]);

  const middleware = useCallback( async (action) => {
    switch (action.type) {

      case 'getTodos': {
        setIsLoading(true);
        const { error, msg, raw, todos } = await getTodos(action.id);
        if (!error) {
          dispatch({ type: 'getTodos', todos: todos, id: action.id });
        };
        return { error, msg, raw, todos };
      }

      case 'addTodo': {
        setIsLoading(true);
        const { error, msg, raw } = await addTodo(action.listId, action.newTodo);
        if (!error) {
          dispatch({ type: 'addTodo', newTodo: action.newTodo });
        }
        return { error, msg, raw };
      }

      case 'deleteTodo': {
        setIsLoading(true);
        const { error, msg, raw } = await deleteTodo(action.listId, action.todoId);
        if (!error) {
          dispatch({ type: 'deleteTodo', todoId: action.todoId });
        }
        return { error, msg, raw };
      }

      case 'editTodo': {
        setIsLoading(true);
        const { error, msg, raw } = await editTodo(action.listId, action.todoId, action.newTodo);
        if (!error) {
          dispatch({ type: 'editTodo', todoId: action.todoId, newTodo: action.newTodo });
        }
        return { error, msg, raw };
      }

      default: {
        dispatch(action);
        return { error: false, msg: '', raw: ''};
      }
    }
  }, [getTodos, addTodo, deleteTodo, editTodo]);

  const todosAPI = useMemo(() => ({
    getTodos: (id) => middleware({ type: 'getTodos', id }),
    addTodo: (listId, newTodo) => middleware({ type: 'addTodo', listId, newTodo }),
    deleteTodo: (listId, todoId) => middleware({ type: 'deleteTodo', listId, todoId }),
    editTodo: (listId, todoId, newTodo) => middleware({ type: 'editTodo', listId, todoId, newTodo }),
  }), [middleware]);

  const contextValue = useMemo(() => ({
    state, todosAPI,
  }), [state, todosAPI]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );

};