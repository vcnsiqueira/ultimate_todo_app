import React, { createContext, useContext, useEffect, useCallback, useMemo, useReducer } from 'react';
import { AuthContext } from '../AuthContext';
import { db } from '../../configs/firebase/firebaseConfig';
import { addDoc, collection, getDocs, query, orderBy, doc, writeBatch, updateDoc } from 'firebase/firestore';
import { order } from '../../utils/order';

const initialState = {
  isLoading: false,
  lists: [],
};

const listsReducer = (state, action) => {
  switch (action.type) {
    case 'getLists': {
      return {
        ...state,
        lists: action.lists,
        isLoading: false,
      }
    }

    case 'addList': {
      const listsArray = order([...state.lists, action.newList], true, 'name');
      return {
        ...state,
        // lists: [...state.lists, action.newList],
        lists: listsArray,
        isLoading: false,
      }
    }

    case 'removeList': {
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.id),
        isLoading: false,
      }
    }

    case 'editList': {
      const listsArray = order(state.lists.map((list) => {
        if (list.id === action.id) {
          const { name, description, type } = action.newData;
          return {
            ...list,
            name,
            description,
            type,
          };
        }
        return list;
      }), true, 'name');
      return {
        ...state,
        lists: listsArray,
        isLoading: false,
      }
    }

    case 'setIsLoading': {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }

  default:
    return state;
  };
};

export const ListsContext = createContext();

export const ListsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(listsReducer, initialState);
  const { currentUser } = useContext(AuthContext);

  const setIsLoading = useCallback((l = true) => dispatch({ type: 'setIsLoading', isLoading: l }), []);

  const getLists = useCallback( async () => {
    try {
      let lists = [];
      const querySnapshot = await getDocs(query(collection(db, `users/${currentUser}/todolists`), orderBy('name')));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          lists = [...lists, { ...doc.data(), id: doc.id }]; 
        });
        return {
          error: false,
          msg: '',
          lists: lists,
        };
      } else {
        return {
          error: false,
          msg: 'This user has no list!',
          raw: '',
        };
      };
    } catch (error) {
      return {
        error: true,
        msg: 'Something went wrong! Please, verify your internet connection and try again!',
        raw: '',
      };
    };
  }, [currentUser]);

  const addList = useCallback( async (newList) => {
    // const token = await getUid(userObject);
    try {
      await addDoc(collection(db, `users/${currentUser}/todolists`), newList);
      return {
        error: false,
        msg: 'New list successfully created!',
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

  const removeList = useCallback( async (id) => {
    // const token = await getUid(userObject);
    try {
      const batch = writeBatch(db);
      const querySnapshot = await getDocs(collection(db, `users/${currentUser}/todolists/${id}/tasks`));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docId) => {
          batch.delete(doc(db, `users/${currentUser}/todolists/${id}/tasks`, docId.id))
        })
      };
      batch.delete(doc(db, `users/${currentUser}/todolists`, id));
      await batch.commit();
      return {
        error: false,
        msg: 'List removed successfully!',
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

  const editList = useCallback ( async (id, newData) => {
    // const token = await getUid(userObject);
    try {
      await updateDoc(doc(db, `users/${currentUser}/todolists/${id}`), newData);
      return {
        error: false,
        msg: 'List successfully updated!',
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

      case 'getLists': {
        setIsLoading(true);
        const { error, msg, raw, lists } = await getLists();
        if (!error) {
          dispatch({ type: 'getLists', lists: lists })
        };
        return { error, msg, raw };
      }

      case 'addList': {
        setIsLoading(true);
        const { error, msg, raw } = await addList(action.newList);
        if(!error) {
          dispatch({
            type: 'addList',
            newList: action.newList
          });
        }
        return { error, msg, raw };
      }

      case 'removeList': {
        setIsLoading(true);
        const { error, msg, raw } = await removeList(action.id);
        if(!error) {
          dispatch({
            type: 'removeList',
            id: action.id
          });
        }
        return { error, msg, raw };
      }

      case 'editList': {
        const { error, msg, raw } = await editList(action.id, action.newData);
        if(!error) {
          dispatch({
            type: 'editList',
            id: action.id,
            newData: action.newData,
          });
        }
        return { error, msg, raw };
      }

      default: {
        dispatch(action);
        return { error: false, msg: '', raw: ''};
      }
    }
  }, [getLists, addList, removeList, editList]);

  const listsAPI = useMemo(() => ({
    getLists: () => middleware({ type: 'getLists' }),
    addList: (newList) => middleware({ type: 'addList', newList }),
    removeList: (id) => middleware({ type: 'removeList', id }),
    editList: (id, newData) => middleware({ type: 'editList', id, newData }),
  }), [middleware]);

  const contextValue = useMemo(() => ({
    state, listsAPI,
  }), [state, listsAPI]);

  useEffect(() => {
    // getting lists in the beginning.
    (async () => {
      const { error, lists } = await getLists();
      if (error) {
        console.log('Failure to get users lists');
      } else {
        dispatch({ type: 'getLists', lists: lists });
      }
    })();
  }, [getLists]);

  return (
    <ListsContext.Provider value={contextValue}>
      {children}
    </ListsContext.Provider>
  );

};