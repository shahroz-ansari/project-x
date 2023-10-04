import { forwardRef } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const SwitchComponent = function({
  name,
  value,
  onLabel,
  offLabel,
  ...rest
}, ref) {
  return <FormControlLabel
    ref={ref}
    label={value ? onLabel : offLabel}
    control={
      <Switch  checked={value} {...rest} />
    }
  />
}

export default forwardRef(SwitchComponent)