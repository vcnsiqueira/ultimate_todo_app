import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TaskItemContainer, Element, TaskOptions } from './styled/TaskItem.styled';

import Badge from '../Badge';
import IconButton from '../IconButton';
import { Check, Close, Edit, Trash } from '../icons';

import { convertDate } from '../../configs/firebase/firebaseConfig';

const getPriority = (priority) => {
  switch (priority) {
    case 'low':
      return { text: 'Low', type: 'success' };
    
    case 'medium':
      return { text: 'Medium', type: 'warning' };

    case 'high':
      return { text: 'High', type: 'error' };
    
    default:
      break;
  };
};

const getStatus = (todo) => {
  const target = moment(convertDate(todo.dateTarget), 'DD/MM/YYYY').toDate();
  switch(todo.done) {
    case true:
      const conclusion = moment(convertDate(todo.dateConclusion), 'DD/MM/YYYY').toDate();
      return conclusion > target ? 
        { text: 'Ended late', type: 'error' } :
        { text: 'Ended in time', type: 'success' };
    case false:
      return new Date() > target ?
        { text: 'Delayed', type: 'error' } :
        { text: 'In time', type: 'success' };
    default:
      break;
  };
};

const TaskItem = ({ todo, deleteTodo, editTodo, toggleTodoDone }) => {

  const priority = getPriority(todo.priority);
  const status = getStatus(todo);

  return (
    <TaskItemContainer>
      <Element done={todo.done}>
        {todo.name}
      </Element>
      <Element>
        <Badge type={priority.type} text={priority.text} />
      </Element>
      <Element>
        {convertDate(todo.dateTarget)}
      </Element>
      <Element>
        <Badge type={status.type} text={status.text} />
      </Element>
      <TaskOptions>
        <IconButton onClick={() => toggleTodoDone(todo.id)}>
          {todo.done ? <Close /> : <Check />}
        </IconButton>
        <IconButton onClick={() => editTodo(todo.id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => deleteTodo(todo.id)}>
          <Trash />
        </IconButton>
      </TaskOptions>
    </TaskItemContainer>
  );
};

TaskItem.propTypes = {
  todo: PropTypes.object,
  deleteTodo: PropTypes.func,
  editTodo: PropTypes.func,
  toggleTodoDone: PropTypes.func,
};

TaskItem.defaultProps = {
  todo: {
    name: '',
    priority: 'low',
    dateConclusion: null,
    done: false,
    
  },
  deleteTodo: () => {},
  editTodo: () => {},
  toggleTodoDone: () => {},
};

export default TaskItem;