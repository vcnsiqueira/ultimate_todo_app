import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';

const Burger = ({ color, width, height }) => {
  return (
    <svg 
      height={height} 
      fill={color} 
      viewBox="0 0 448 512" 
      width={width} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
    </svg>
  );
};

Burger.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Burger.defaultProps = {
  color: theme.white,
  width: '20',
  height: '20'
};

export default Burger;