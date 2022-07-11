import React from 'react';
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField';

const Input = ({ 
    label,
    variant,
    type,
    name,
    value,
    error,
    errorMessage,
    multiline,
    onChange,
    onBlur,
    fullWidth,
    required,
    style,
    disabled,
    placeholder,
}) => {
    return (
        <TextField
            label={label}
            variant={variant}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            error={error}
            helperText={errorMessage}
            multiline={multiline}
            onChange={onChange}
            onBlur={onBlur}
            fullWidth={fullWidth}
            required={required}
            disabled={disabled}
            style={{margin: '5px', ...style }}
        />
    );
};

Input.propTypes = {
    label: PropTypes.string,
    variant: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    multiline: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    label: '',
    variant: 'standard',
    type: 'text',
    name: '',
    placeholder: '',
    error: false,
    multiline: false,
    fullWidth: true,
    required: false,
    disabled: false,
}


export default Input;