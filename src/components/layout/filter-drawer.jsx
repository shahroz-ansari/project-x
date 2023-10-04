import * as React from 'react';
import { Box, Drawer } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTheme } from '@mui/material/styles';
import Filter from '../form-components/filter.component';

export default function FilterDrawer() {
  const theme = useTheme()
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  return (
    <>
      <Box
        sx={{
          position:'absolute',
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'background.paper',
          bottom: theme.spacing(3)
        }}
      />
      <Box
        sx={{
          background: 'transparent',
          padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
          position: 'absolute',
          bottom: theme.spacing(2.5),
        }}
        onClick={toggleDrawer(true)}
      >
        <FilterAltIcon color='primary'/>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Filter closeDrawer={toggleDrawer(false)} />
      </Drawer>
    </>
  );
}
