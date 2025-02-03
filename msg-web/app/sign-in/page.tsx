'use client';

import { SignInForm } from '@/src/components/sign-in.form.component';
import { Box } from '@mui/material';

export default function Page() {
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
      <SignInForm />
    </Box>
  );
}
