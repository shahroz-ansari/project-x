import { forwardRef } from 'react';
import { TextField, MenuItem } from '@mui/material';

const InputComponent = function({
  name,
  select,
  selectList,
  fullWidth = true,
  size = 'small',
  error = false,
  helperText = '',
  errors,
  ...rest
}, ref) {
  return <TextField
    {...rest}
    name={name}
    id={name}
    fullWidth={fullWidth}
    size={size}
    select={select}
    ref={ref}
    error={error || Boolean(errors?.[name])}
    helperText={errors?.[name]?.message || helperText}
  >
    {select && selectList.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
}

export default forwardRef(InputComponent)