import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const MyButton = ({ variant, color, disabled, size, startIcon, endIcon, children, onClick, fullWidth }) => {
    return (
        <Button 
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            fullWidth={fullWidth}
        >
            {children}
        </Button>
    );
};

MyButton.propTypes = {
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error']),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    children: PropTypes.node,
    onClick: PropTypes.func,
    fullWidth: PropTypes.bool,
}

MyButton.defaultProps = {
    variant: 'contained',
    color: 'primary',
    disabled: false,
    size: 'medium',
    fullWidth: false,
}

export default MyButton;