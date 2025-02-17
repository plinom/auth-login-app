import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onSubmit: () => void;
}

export const FormWrapper: FC<Props> = ({ children, onSubmit }) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '500px',
        p: 3,
      }}
    >
      {children}
    </Box>
  );
};
