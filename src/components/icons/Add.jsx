import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';

const Add = ({ color, width, height }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill={color}
      width={width}
      height={height}
      >
        <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
      </svg>
    // <svg 
    //   xmlns="http://www.w3.org/2000/svg" 
    //   viewBox="0 0 24 24" 
    //   fill={color}
    //   width={width} 
    //   height={height}
    // >
    //   <path d="M0 0h24v24H0z" fill="none" />
    //   <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    // </svg>
  );
};

Add.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

Add.defaultProps = {
  color: theme.primary,
  width: '20',
  height: '20'
}

export default Add;