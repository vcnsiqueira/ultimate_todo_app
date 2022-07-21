import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

const MyIconButton = ({ color, disabled, size, children, onClick }) => {
    return (
        <IconButton
            color={color}
            size={size}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </IconButton>
    );
};

MyIconButton.propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error']),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    children: PropTypes.node,
    onClick: PropTypes.func,
}

MyIconButton.defaultProps = {
    color: 'primary',
    disabled: false,
    size: 'medium',
}

export default MyIconButton;