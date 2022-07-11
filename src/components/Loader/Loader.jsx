import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Backdrop from '@mui/material/Backdrop';

const Loader = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#0091EA', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            //onClick={handleClose}
            style={{ backgroundColor: '#CCCCCC', opacity: '0.6'}}
        >
            <Box sx={{ display: 'flex' }}>
                <CircularProgress color="inherit" />
            </Box>
        </Backdrop>
    );
};

Loader.propTypes = {
    open: PropTypes.bool,
    //handleClose: PropTypes.func,
};

Loader.defaultProps = {
    open: false,
    // handleClose: () => {},
};

export default Loader;