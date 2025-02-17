'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Page() {
  const router = useRouter();

  const handleSignUp = useCallback(() => {
    router.push('authenticate/sign-up');
  }, [router]);

  const handleSignIn = useCallback(() => {
    router.push('authenticate/sign-in');
  }, [router]);
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 8,
          }}
        >
          <Typography component='h1' gutterBottom variant='h4'>
            Welcome to MSG
          </Typography>
          <Typography gutterBottom variant='body1'>
            Your message application for seamless communication.
          </Typography>
          <Button
            color='primary'
            onClick={handleSignUp}
            sx={{ marginTop: 2, width: '100%' }}
            variant='contained'
          >
            Sign Up
          </Button>
          <Button
            color='primary'
            onClick={handleSignIn}
            sx={{ marginTop: 2, width: '100%' }}
            variant='outlined'
          >
            Sign In
          </Button>
        </Box>
      </Container>
    </>
  );
}
