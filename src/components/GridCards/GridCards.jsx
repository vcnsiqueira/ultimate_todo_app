import React from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import ListCard from '../ListCard';

const GridCards = ({ list, removeList, editList }) => {
  return (
    <Grid container spacing={1}>
      {
        list.map(card => (
          <Grid item xs sm md lg key={card.id}>
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