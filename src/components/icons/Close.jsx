import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';

function Close({ color, width, height }) {
  return (
    <svg 
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
    </svg>
  );
};

Close.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Close.defaultProps = {
  color: theme.primary,
  width: '20',
  height: '20'
};

export default Close;