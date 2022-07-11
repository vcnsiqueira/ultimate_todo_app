import React from 'react';
import PropTypes from 'prop-types';

import { TaskItemContainer, Element, TaskOptions } from './styled/TaskItem.styled';

import Badge from '../Badge';
import IconButton from '../IconButton';
import { Check, Edit, Trash } from '../icons';

const TaskItem = ({ children, id, priority, done, deleteTodo }) => {
  return (
    <TaskItemContainer>
      <Element>
        {children}
      </Element>
      <td>
        <Badge type={priority} />
      </td>
      <TaskOptions>
        <IconButton onClick={() => console.log('New Todo')}>
          <Check />
        </IconButton>
        <IconButton onClick={() => console.log('New Todo')}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => deleteTodo(id)}>
          <Trash />
        </IconButton>
      </TaskOptions>
    </TaskItemContainer>
  );
};

TaskItem.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func,
};

TaskItem.defaultProps = {
  children: '',
  priority: 'low',
  deleteTodo: () => {},
};

export default TaskItem;