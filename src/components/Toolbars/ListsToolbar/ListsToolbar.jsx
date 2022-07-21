import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
  ListsToolbarContainer,
  ListsInformation,
  ListsTitle,
  NumberOfLists,
} from './styled/ListsToolbar.styled';

import IconButton from '../../IconButton';
import { Add } from '../../icons';

const ListsToolbar = ({ list, addNewList }) => {

  // const [open, setOpen] = useState(false)

  return (
    <ListsToolbarContainer>
      <ListsInformation>
        <ListsTitle>Todo Lists</ListsTitle>
        <NumberOfLists>Number of lists: <span>{list.length}</span></NumberOfLists>
      </ListsInformation>
      <IconButton onClick={addNewList}>
        <Add />
      </IconButton>
    </ListsToolbarContainer>
  );
};

ListsToolbar.propTypes = {
  list: PropTypes.array,
  addNewList: PropTypes.func,
};

ListsToolbar.defaultProps = {
  list: [],
  addNewList: () => {},
};

export default ListsToolbar;