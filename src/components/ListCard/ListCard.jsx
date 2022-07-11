import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core';
import IconButton from '../IconButton';
import { Edit, Trash } from '../icons';

import { ListCardFootnote, ListCardOptions } from './styled/ListCard.styled';
import { convertDate } from '../../configs/firebase/firebaseConfig';

const ListCard = ({ id, title, date, type, removeList, editList }) => {

  const navigate = useNavigate();

  // const remove = (event) => {
  //   event.stopPropagation();
  //   removeList(id);
  // };

  return (
    <Card style={{
      minWidth: '200px',
      maxWidth: '300px',
      height: '120px',
      backgroundColor: '#F5F5F5',
      cursor: 'pointer',
    }}
      onClick={() => navigate(`/${id}`)}
    >

      <CardContent style={{
        padding: '5%'
      }}>
        <Typography 
          gutterBottom
          variant="h6"
          component="div"
          style={{ 
            color: '#243A73',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          style={{
            fontSize: '12px'
          }}
        >
          <span style={{ 
            fontWeight: 'bold',
          }}
          >
            Type:
          </span> {type}
        </Typography>
        <ListCardFootnote>
          <span>
            {convertDate(date)}
          </span>
          <ListCardOptions>
            <IconButton onClick={(e) => { e.stopPropagation(); editList(id); }}>
              <Edit width='14' height='14'/>
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); removeList(id); }}>
              <Trash width='14' height='14'/>
            </IconButton>
          </ListCardOptions>
        </ListCardFootnote>
      </CardContent>
    </Card>
  );
};

ListCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  removeList: PropTypes.func,
  editList: PropTypes.func,
};

ListCard.defaultProps = {
  title: 'No title',
  type: 'None',
  removeList: () => {},
  editList: () => {},
};

export default ListCard;