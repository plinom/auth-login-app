'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export const MuiUiProvider: FC<Props> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true, key: 'css' }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};
