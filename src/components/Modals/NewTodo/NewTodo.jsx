import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { verifyEmptyField } from '../../../utils/validators';

import Input from '../../Input';
import Button from '../../Button';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import { AdapterDateFns } from '@material-ui/lab/AdapterDateFns';
// import { LocalizationProvider } from '@material-ui/lab/LocalizationProvider';
// import { DesktopDatePicker } from '@material-ui/lab/DesktopDatePicker';

import { convertToTimestamp } from '../../../configs/firebase/firebaseConfig';

const NewTodo = ({ isEdit, initialValue, createNewTodo, editTodo, close }) => {

  const [task, setTask] = useState({ value: initialValue.task, error: false, errorMessage: '' });
  const [dateTarget, setDateTarget] = useState({ value: initialValue.dateTarget, error: false, errorMessage: '' });
  const [priority, setPriority] = useState({ value: initialValue.priority, error: false, errorMessage: ''});

  const handleTask = (val) => {
    const msg = verifyEmptyField(val, true);
    setTask({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    });
  };

  const handleDateTarget = (val) => {
    const msg = verifyEmptyField(val, true);
    setDateTarget({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    });
  };

  const handlePriority = (val) => {
    const msg = verifyEmptyField(val, true);
    setPriority({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    });
  };

  const handleSubmit = async () => {
    if (!task.error && task.value !== '' && !dateTarget.error && dateTarget.value !== '' && !priority.error && priority.value !== '') {
      const todo = {
        name: task.value,
        dateTarget: convertToTimestamp(new Date(moment(dateTarget.value, 'DD/MM/YYYY').toDate())),
        priority: priority.value,
        createdAt: isEdit? initialValue.createdAt : convertToTimestamp(new Date()),
      }
      isEdit ? await createNewTodo(todo) : await createNewTodo(todo);
      // console.log(todo);
    } else {
      console.log('You cannot execute this action!');
    }
    close();
  }

  return (
    <div>
      {!isEdit ?
        <p>
          To create a new todo, please fill the information below.
        </p> :
        <p>
          Please, edit the todo information below.
        </p>
      }
      <Input
        label="Todo name"
        variant="outlined"
        type="text"
        value={task.value}
        placeholder="Name of the todo"
        error={task.error}
        errorMessage={task.errorMessage}
        onChange={e => setTask({ value: e.target.value, error: task.error, errorMessage: task.errorMessage }) }
        onBlur={e => handleTask(e.target.value)}
        fullWidth
        required
      />
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <Input
          label="Target date"
          variant="outlined"
          value={dateTarget.value}
          placeholder="Date limit to conclude the todo"
          error={dateTarget.error}
          errorMessage={dateTarget.errorMessage}
          onChange={e => setDateTarget({ value: e.target.value, error: dateTarget.error, errorMessage: dateTarget.errorMessage })}
          onBlur={e => handleDateTarget(e.target.value)}
          fullWidth
          required
        />
      {/* </LocalizationProvider> */}
      <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="Target date"
          // variant="outlined"
          value={priority.value}
          placeholder="Date limit to conclude the todo"
          error={priority.error}
          errorMessage={priority.errorMessage}
          onChange={e => setPriority({ value: e.target.value, error: dateTarget.error, errorMessage: dateTarget.errorMessage })}
          onBlur={e => handlePriority(e.target.value)}
          fullWidth
          required
          style={{ margin: '6px 0 0 6px' }}
        >
          <MenuItem value={'low'}>Low</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'high'}>High</MenuItem>
        </Select>
      <DialogActions style={{ padding: '10px 20px 0px' }}>
        <Button onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} autoFocus>
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

NewTodo.propTypes = {
  isEdit: PropTypes.bool,
  initialValue: PropTypes.object,
  createNewTodo: PropTypes.func,
  editTodo: PropTypes.func,
  close: PropTypes.func,
};

NewTodo.defaultProps = {
  isEdit: false,
  initialValue: {
    task: '',
    dateTarget: new Date().toLocaleDateString('en-UK'),
    priority: 'low',
  },
  createNewTodo: () => {},
  editTodo: () => {},
  close: () => {},
};

export default NewTodo;