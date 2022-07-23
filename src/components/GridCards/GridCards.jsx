import React from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ListCard from '../ListCard';

const GridCards = ({ list, removeList, editList }) => {
  return (
    // <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {
          list.map(card => (
            <Grid item key={card.id}>
              <ListCard 
                id={card.id}
                title={card.name}
                type={card.type}
                date={card.createdAt}
                removeList={removeList}
                editList={editList}
              />
            </Grid>
          ))
        }        
      </Grid>
    // </Box>
  );
};

GridCards.propTypes = {
  list: PropTypes.array,
  removeList: PropTypes.func,
  editList: PropTypes.func,
};

GridCards.defaultProps = {
  list: [],
  removeList: () => {},
  editList: () => {},
};

export default GridCards;