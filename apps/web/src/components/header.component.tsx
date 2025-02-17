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
        alignItems: 'center',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex',
        minHeight: '64px',
        paddingX: 3,
        paddingY: 1,
        width: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 auto',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
          <Typography variant='h6'>MSG</Typography>
        </Box>

        <IconButton
          aria-label='menu'
          color='inherit'
          edge='start'
          onClick={toggleMenu}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Menu open={open} toggleMenu={toggleMenu} />
    </Box>
  );
};
