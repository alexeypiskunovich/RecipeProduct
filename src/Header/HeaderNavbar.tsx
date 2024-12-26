import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import InputField from './InputField/InputField';

const HeaderNavbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Функции для открытия и закрытия меню
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#34495e', height: 85, boxShadow: '0px 4px 20px rgba(0, 0, 0, 1)', borderRadius:'15px' }}>
      <Toolbar>
        <Box sx={{display:'flex',flexDirection:{xs:'column', md:'row'} }}>
        <Typography variant="h4" style={{ color: '#ecf0f1', fontFamily: 'algerian', fontSize: '35px', marginTop:'5px'}}>
          Products
        </Typography>
        
          <InputField/>
        
        </Box>
        <div style={{ marginLeft: 'auto' }}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleMenuClick}
            style={{ fontSize: '20px', fontFamily: 'algerian', color: '#ecf0f1', borderColor: '#ecf0f1', marginLeft:'-16px' }}
          >
            Menu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                backgroundColor: '#2c3e50',
                color: '#ecf0f1',
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <NavLink to='/myFavorite' style={{ textDecoration: 'none', color: '#ecf0f1' }}>
                Favorite 
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NavLink to='/create' style={{ textDecoration: 'none', color: '#ecf0f1' }}>
              Сreate
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NavLink to='/main' style={{ textDecoration: 'none', color: '#ecf0f1' }}>
              Main
              </NavLink>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavbar;


