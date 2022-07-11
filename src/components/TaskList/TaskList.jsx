import React from 'react';
import PropTypes from 'prop-types';

import { TaskListContainer, List } from './styled/TaskList.styled';

import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ tasks, deleteTodo }) => {
  return (
    <TaskListContainer>
      {tasks.length === 0 ?
        <div>
          This list is still empty. If you want to create a new task, please click the add buttom above!
        </div> :
        <List>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Task</th>
              <th style={{ width: '40%' }}>Priority</th>
              <th style={{ width: '20%' }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskItem key={task.id} id={task.id} deleteTodo={deleteTodo} priority={task.priority}>
                {task.name}
              </TaskItem>
            ))}
          </tbody>
        </List>
      }
    </TaskListContainer>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  deleteTodo: PropTypes.func,
};

TaskList.defaultProps = {
  tasks: [],
  deleteTodo: () => {},
};

export default TaskList;
