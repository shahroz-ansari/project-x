import * as React from 'react';
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
  Select,
  ListItemText,
  Checkbox
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function MultiSelect({
  selectList,
  label,
  size="small",
  value = [],
  ...rest
}, ref) {

  return (<FormControl>
    <InputLabel>{label}</InputLabel>
    <Select
      {...rest}
      ref={ref}
      multiple
      value={value}
      size={size}
      input={<OutlinedInput label={label} />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {selectList.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          <Checkbox checked={value.includes(item.value)} />
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  );
}

export default React.forwardRef(MultiSelect)
