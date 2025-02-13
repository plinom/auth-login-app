import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Box
      sx={{
        left: '50%',
        m: '0 auto',
        maxWidth: '500px',
        padding: 2,
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}
