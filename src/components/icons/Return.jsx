import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';

function Return({ color, width, height }) {
  return (
    <svg 
      width="24"
      height="24"
      viewBox="0 0 18 30"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
    >
      <path d="M5.92245 15.0063L17.1454 3.78293C17.4544 3.47463 17.6244 3.06244 17.6244 2.62293C17.6244 2.18317 17.4544 1.77122 17.1454 1.46244L16.162 0.479512C15.8534 0.170244 15.441 0 15.0015 0C14.562 0 14.15 0.170244 13.8412 0.479512L0.478543 13.842C0.168543 14.1517 -0.00121298 14.5656 6.53447e-06 15.0056C-0.00121298 15.4476 0.168299 15.861 0.478543 16.171L13.8288 29.5205C14.1376 29.8298 14.5495 30 14.9893 30C15.4288 30 15.8407 29.8298 16.1498 29.5205L17.1329 28.5376C17.7727 27.8978 17.7727 26.8563 17.1329 26.2168L5.92245 15.0063Z" />
    </svg>

  );
}

Return.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

Return.defaultProps = {
  color: theme.primary,
  width: '20',
  height: '20'
}

export default Return;
