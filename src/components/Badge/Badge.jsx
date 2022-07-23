import React from 'react';
import PropTypes from 'prop-types';

import { BadgeContainer } from './styled/Badge.styled';

const Badge = ({ type, text }) => {

  return (
    <BadgeContainer type={type} style={{ opacity: '0.7' }}>
      {text}
    </BadgeContainer>
  );
};

Badge.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  text: PropTypes.string,
}

Badge.defaultProps = {
  type: 'success',
  text: '',
}

export default Badge;