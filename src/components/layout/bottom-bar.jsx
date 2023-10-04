import { BottomNavigation, BottomNavigationAction, Menu, MenuItem, Paper } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListIcon from '@mui/icons-material/List';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useNavigate } from "react-router-dom";

import FilterDrawerCTA from './filter-drawer'
import { useState } from "react";

const BottomBar = function() {
  const [menuTarget, setMenuTarget] = useState(null);
  const menuVisibility = Boolean(menuTarget)

  const closeMenu = () => setMenuTarget(null)
  const handleMenuItemClick = (path) => {
    navigate(path)
    closeMenu()
  }

  const navigate = useNavigate()

  const handleNavigation = (value, event) => {
    if(value) {
      if (value === 'back') {
        navigate(-1)
        return;
      }
      if(value === 'menu') {
        setMenuTarget(event.currentTarget)
        return;
      }
      navigate(value)
    }
  }

  return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
  <BottomNavigation
    showLabels
    sx={{
      backgroundColor: 'primary.main',
    }}
    onChange={(e, path) => handleNavigation(path, e)}
  >
    <BottomNavigationAction
      value="back"
      label="Back"
      icon={<ArrowBackIcon />}
      sx={{color: 'background.paper'}}
    />
    <BottomNavigationAction
      value="/"
      label="Home"
      icon={<HomeIcon />}
      sx={{color: 'background.paper'}}
    />

    <BottomNavigationAction disableRipple />

    <BottomNavigationAction
      value="/projects"
      label="Projects"
      icon={<ListIcon />}
      sx={{color: 'background.paper'}}
    />
    <BottomNavigationAction
      value="menu"
      label="Menu"
      icon={<WidgetsIcon />}
      sx={{color: 'background.paper'}}
    />
    <FilterDrawerCTA />
  </BottomNavigation>

  <Menu
    anchorEl={menuTarget}
    open={menuVisibility}
    onClose={closeMenu}
  >
    <MenuItem onClick={()=> handleMenuItemClick('/msa')}>MSA</MenuItem>
    <MenuItem onClick={()=> handleMenuItemClick('/sow')}>SOW</MenuItem>
    <MenuItem onClick={()=> handleMenuItemClick('/timesheet/dashboard')}>Timesheet</MenuItem>
    <MenuItem onClick={()=> handleMenuItemClick('/invoice/dashboard')}>Invoice</MenuItem>
    <MenuItem onClick={()=> handleMenuItemClick('/settings')}>Settings</MenuItem>
  </Menu>
</Paper>
}

export default BottomBar