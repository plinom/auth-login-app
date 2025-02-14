'use client';

import { withAuth } from '@/src/hocs/with-auth.hoc';
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  useColorScheme,
} from '@mui/material';
import { User } from 'firebase/auth';
import { FC, useEffect } from 'react';

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    console.log(token, user.email);
  }, [token, user.email]);

  return (
    <Box sx={{ height: '100%', p: 3, width: '100%' }}>
      <Container maxWidth='md'>
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
            Appearance
          </Typography>
          <Typography color='text.secondary' sx={{ mb: 3 }} variant='body1'>
            Customize how the MSG looks on your device. Choose between
            light, dark, or system-based theme.
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby='demo-theme-toggle'
              name='theme-toggle'
              onChange={(event) =>
                setMode(event.target.value as 'dark' | 'light' | 'system')
              }
              row
              sx={{ gap: 2 }}
              value={mode}
            >
              <FormControlLabel
                control={<Radio />}
                label='System'
                value='system'
              />
              <FormControlLabel
                control={<Radio />}
                label='Light'
                value='light'
              />
              <FormControlLabel control={<Radio />} label='Dark' value='dark' />
            </RadioGroup>
          </FormControl>
        </Paper>
      </Container>
    </Box>
  );
};

export default withAuth(Page);
