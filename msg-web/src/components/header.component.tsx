'use client';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

import { Menu } from './drawer.component';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar color='primary' position='static'>
        <Toolbar>
          <IconButton
            aria-label='menu'
            color='inherit'
            edge='start'
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }} variant='h6'>
            MSG
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu open={open} toggleMenu={toggleMenu} />
    </Box>
  );
};
