import React from 'react';
import PropTypes from 'prop-types';

import { TaskListContainer, List } from './styled/TaskList.styled';

import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ tasks, deleteTodo, editTodo, toggleTodoDone }) => {
  return (
    <TaskListContainer>
      {tasks.length === 0 ?
        <div>
          This list is still empty. If you want to create a new task, please click the add buttom above!
        </div> :
        <List>
          <thead>
            <tr>
              <th style={{ width: '35%' }}>Task</th>
              <th style={{ width: '15%' }}>Priority</th>
              <th style={{ width: '15%' }}>Deadline</th>
              <th style={{ width: '15%' }}>Status</th>
              <th style={{ width: '20%' }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskItem 
                key={task.id}
                todo={task}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleTodoDone={toggleTodoDone}
              >
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
  editTodo: PropTypes.func,
  toggleTodoDone: PropTypes.func,
};

TaskList.defaultProps = {
  tasks: [],
  deleteTodo: () => {},
  editTodo: () => {},
  toggleTodoDone: () => {},
};

export default TaskList;
