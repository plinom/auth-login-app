'use client';

import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

import { Menu } from './drawer.component';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '64px',
        paddingX: 2,
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography sx={{ flexGrow: 1 }} variant='h6'>
          MSG
        </Typography>
        <IconButton
          aria-label='menu'
          color='inherit'
          edge='start'
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Menu open={open} toggleMenu={toggleMenu} />
    </Box>
  );
};
