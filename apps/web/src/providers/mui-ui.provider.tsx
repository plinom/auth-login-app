'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: '#121212',
          paper: '#1E1E1E',
        },
        mode: 'dark',
        primary: {
          main: '#90CAF9',
        },
        secondary: {
          main: '#F48FB1',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B0BEC5',
        },
      },
    },
    light: {
      palette: {
        background: {
          default: '#F5F5F5',
          paper: '#FFFFFF',
        },
        mode: 'light',
        primary: {
          main: '#007FFF',
        },
        secondary: {
          main: '#FF6F61',
        },
        text: {
          primary: '#000000',
          secondary: '#555555',
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-2px)',
          },
          borderRadius: 6,
          fontWeight: 'bold',
          textTransform: 'none',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&:hover': {
            transform: 'scale(1.02)',
          },
          border: '1px solid #E0E0E0',
          borderRadius: 12,
          transition: 'transform 0.3s ease-in-out',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: 6,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
  },
});

export const MuiUiProvider: FC<Props> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true, key: 'css' }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};
