import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TaskListContainer, List } from './styled/TaskList.styled';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ tasks, deleteTodo, editTodo, toggleTodoDone }) => {

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filterType, setFilterType] = useState('all')

  const handleFilterType = event => {
    const newFilterType = event.target.value;
    setFilterType(newFilterType);
    switch (newFilterType) {
      case 'done':
        setFilteredTasks(tasks.filter((task) => task.done === true));
        break;
      
      case 'undone':
        setFilteredTasks(tasks.filter((task) => task.done !== true));
        break;
    
      default:
        setFilteredTasks(tasks);
        break;
    };
  };

  return (
    <>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="all"
        name="radio-buttons-group"
        style={{ display: 'flex', justifyContent: 'center' }}
        onChange={handleFilterType}
      >
        <FormControlLabel value="all" checked={filterType === 'all'} control={<Radio />} label="all" />
        <FormControlLabel value="undone" checked={filterType === 'undone'} control={<Radio />} label="undone" />
        <FormControlLabel value="done" checked={filterType === 'done'} control={<Radio />} label="done" />
      </RadioGroup>
      <TaskListContainer>
        {filteredTasks.length === 0 ?
          <p style={{ fontSize: '14px' }}>
            This list is still empty. If you want to create a new task, please click the add buttom above!
          </p> :
          <List>
            <thead>
              <tr style={{ backgroundColor:'#E3F2FD', height: '36px' }}>
                <th style={{ width: '35%' }}>Task</th>
                <th style={{ width: '15%' }}>Priority</th>
                <th style={{ width: '15%' }}>Deadline</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '20%' }}>Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
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
    </>
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
