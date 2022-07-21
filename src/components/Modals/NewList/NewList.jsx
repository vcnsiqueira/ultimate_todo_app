import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { verifyEmptyField } from '../../../utils/validators';

import Input from '../../Input';
import Button from '../../Button';
import DialogActions from '@material-ui/core/DialogActions';

import { convertToTimestamp } from '../../../configs/firebase/firebaseConfig';

const NewList = ({ initialValue, isEdit, close, createNewList, editList }) => {

  const [name, setName] = useState({ value: initialValue.name, error: false, errorMessage: '' });
  const [description, setDescription] = useState({ value: initialValue.description, error: false, errorMessage: '' });
  const [type, setType] = useState({ value: initialValue.type, error: false, errorMessage: '' });

  const handleName = (val) => {
    const msg = verifyEmptyField(val, true);
    setName({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    })
  };

  const handleType = (val) => {
    const msg = verifyEmptyField(val, true);
    setType({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    })
  };

  const handleDescription = (val) => {
    const msg = verifyEmptyField(val, true);
    setDescription({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    })
  };

  const handleSubmit = async () => {
    if (!name.error && name.value !== '' && !description.error && description.value !== '' && !type.error && type.value !== '') {
      const list = {
        name: name.value,
        description: description.value,
        type: type.value,
        createdAt: isEdit? initialValue.createdAt : convertToTimestamp(new Date()),
      }
      isEdit ? await editList(list) : await createNewList(list);
    } else {
      console.log('You cannot execute this action!');
    }
    close();
  }

  return (
    <div>
      {!isEdit ?
        <p>
          To create a new list, please fill the information below.
        </p> :
        <p>
          Please, edit the list information below.
        </p>
      }
      <Input
        label="List Name"
        variant="outlined"
        type="text"
        value={name.value}
        placeholder="Name of the new list"
        error={name.error}
        errorMessage={name.errorMessage}
        onChange={e => setName({ value: e.target.value, error: name.error, errorMessage: name.errorMessage }) }
        onBlur={e => handleName(e.target.value)}
        fullWidth
        required
      />
      <Input
        label="Description"
        variant="outlined"
        type="text"
        value={description.value}
        placeholder="Description of the list"
        error={description.error}
        errorMessage={description.errorMessage}
        onChange={e => setDescription({ value: e.target.value, error: description.error, errorMessage: description.errorMessage })}
        onBlur={e => handleDescription(e.target.value)}
        fullWidth
        required
      />
      <Input
        label="Type of the list"
        variant="outlined"
        type="text"
        value={type.value}
        placeholder="What is this list for"
        error={type.error}
        errorMessage={type.errorMessage}
        onChange={e => setType({ value: e.target.value, error: type.error, errorMessage: type.errorMessage })}
        onBlur={e => handleType(e.target.value)}
        fullWidth
        required
      />
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

NewList.propTypes = {
  isEdit: PropTypes.bool,
  initialValue: PropTypes.object,
  close: PropTypes.func,
  editList: PropTypes.func,
  createNewList: PropTypes.func,
};

NewList.defaultProps = {
  isEdit: false,
  initialValue: {
    name: '',
    description: '',
    type: '',
  },
  close: () => {},
  editList: () => {},
  createNewList: () => {},
};

export default NewList;