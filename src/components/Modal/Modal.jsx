import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({
  open,
  title,
  noLabel,
  yesLabel,
  onCancel,
  onSubmit,
  children, 
}) => {
  
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
        {title}
      </DialogTitle>
      <div style={{ padding: '0 20px 20px'}}>
        {children}
      </div>
      {(noLabel !== '' || yesLabel !== '') && (
        <DialogActions style={{ padding: '0 20px 20px' }}>
          { noLabel !== '' && (
            <Button onClick={onCancel}>
              {noLabel}
            </Button>
          )}
          { yesLabel !== '' && (
            <Button onClick={onSubmit} autoFocus>
              {yesLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  noLabel: PropTypes.string,
  yesLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
}

Modal.defaultProps = {
  open: false,
  title: '',
  noLabel: 'Cancel',
  yesLabel: 'Ok',
  onCancel: () => {},
  onSubmit: () => {},
};

export default Modal;
