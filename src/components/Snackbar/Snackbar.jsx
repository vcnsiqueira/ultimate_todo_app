import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const MySnackbar = ({ 
    open,
    children,
    type,
    duration,
    position,
    variant,
    handleClose
}) => {

    let placement = '';
    switch (position) {
        case 'top-left':
            placement = { vertical: 'top', horizontal: 'left' };
            break;
        case 'top-center':
            placement = { vertical: 'top', horizontal: 'center' };
            break;
        case 'top-right':
            placement = { vertical: 'top', horizontal: 'right' };
            break;
        case 'bottom-left':
            placement = { vertical: 'bottom', horizontal: 'left' };
            break;
        case 'bottom-center':
            placement = { vertical: 'bottom', horizontal: 'center' };
            break;
        case 'bottom-right':
            placement = { vertical: 'bottom', horizontal: 'right' };
            break;
        default:
            break;
    };

    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={placement}>
            <Alert onClose={handleClose} variant={variant} severity={type} sx={{ width: '100%' }}>
                {children}
            </Alert>
        </Snackbar>
    );
};

MySnackbar.propTypes = {
    open: PropTypes.bool,
    type: PropTypes.string,
    duration: PropTypes.number,
    variant: PropTypes.string,
    position: PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']),
    handleClose: PropTypes.func,
    children: PropTypes.node,
};

MySnackbar.defaultProps = {
    open: false,
    type: 'success',
    duration: 2000,
    position: 'bottom-right',
    variant: 'filled',
}

export default MySnackbar;