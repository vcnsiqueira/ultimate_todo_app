import React from 'react';
import PropTypes from 'prop-types';

import { BadgeContainer } from './styled/Badge.styled';

const Badge = ({ type }) => {

  const getText = (type) => {
    switch (type) {
      case 'low':
        return 'Low';
      
      case 'medium':
        return 'Medium';
  
      case 'high':
        return 'High';
      
      default:
        break;
    };
  }

  return (
    <BadgeContainer type={type}>
      {getText(type)}
    </BadgeContainer>
  );
};

Badge.propTypes = {
  type: PropTypes.oneOf(['low', 'medium', 'high'])
}

export default Badge;