import { Container, Paper, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  description: string;
  title: string;
}

export const ActionItem: FC<Props> = ({ children, description, title }) => {
  return (
    <Container maxWidth='md' sx={{ my: '10px' }}>
      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography sx={{ mb: 2 }} variant='h5'>
          {title}
        </Typography>
        <Typography color='text.secondary' sx={{ mb: 3 }} variant='body1'>
          {description}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};
