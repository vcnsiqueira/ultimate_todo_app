import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { 
  TodosToolbarContainer,
  TodosInformation,
  TodosTitle,
  ListDescription,
  NumberOfTodos,
  LeftSide,
} from './styled/TodosToolbar.styled';

import IconButton from '../../IconButton';
import { Add, Return } from '../../icons';

const ListsToolbar = ({ list, tasks, addTodo }) => {

  const navigate = useNavigate();

  return (
    <TodosToolbarContainer>
      <LeftSide>
        <IconButton onClick={() => navigate('/')}>
          <Return />
        </IconButton>
        <TodosInformation>
          <TodosTitle>
            {list.name || 'List without title'}
          </TodosTitle>
          <ListDescription>
            {list.description || 'No description provided!'}
          </ListDescription>
          <NumberOfTodos>
            Number of todos: <span>{tasks.length}</span>
          </NumberOfTodos>
        </TodosInformation>
      </LeftSide>
      <IconButton onClick={addTodo}>
        <Add />
      </IconButton>
    </TodosToolbarContainer>
  );
};

ListsToolbar.propTypes = {
  list: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object),
  addTodo: PropTypes.func,
};

ListsToolbar.defaultProps = {
  list: {},
  tasks: [],
  addTodo: () => {},
};

export default ListsToolbar;