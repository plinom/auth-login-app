  'use client';

  import { SnackbarProvider } from 'notistack';
  import { FC, ReactNode } from 'react';

  interface Props {
    children: ReactNode;
  }

  export const NotistackProvider: FC<Props> = ({ children }) => {
    return (
      <SnackbarProvider autoHideDuration={3000} maxSnack={6}>
        {children}
      </SnackbarProvider>
    );
  };
