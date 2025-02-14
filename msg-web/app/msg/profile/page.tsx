'use client';

import { withAuth } from '@/src/hocs/with-auth.hoc';
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

interface Props {
  token: string;
  user: User;
}

const fetchUser = async (token: string): Promise<void> => {
  const response = await fetch(
    `http://${process.env.API_HOST}:${process.env.API_PORT}/users/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  );

  if (!response.ok) throw new Error('Faild to get user');

  return response.json();
};

const ProfilePage: FC<Props> = ({ token, user }) => {
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
          email: data.email,
          fullName: data.fullName,
          username: data.username,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [token, user.uid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `/api/users/${user.uid}`,
        { ...profile },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setLoading(false);
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        mt: 4,
        p: 3,
      }}
    >
      <Typography gutterBottom variant='h5'>
        Profile Settings
      </Typography>
      <Avatar sx={{ height: 80, mb: 2, mx: 'auto', width: 80 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label='Full Name'
          margin='normal'
          name='fullName'
          onChange={handleChange}
          value={profile.fullName}
        />
        <TextField
          fullWidth
          label='Email'
          margin='normal'
          name='email'
          onChange={handleChange}
          type='email'
          value={profile.email}
        />
        <TextField
          fullWidth
          label='Username'
          margin='normal'
          name='username'
          onChange={handleChange}
          value={profile.username}
        />
        <Button
          color='primary'
          disabled={loading}
          fullWidth
          sx={{ mt: 2 }}
          type='submit'
          variant='contained'
        >
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </form>
      <Typography sx={{ mt: 2 }} variant='body2'>
        <Link href='/dashboard'>Back to Dashboard</Link>
      </Typography>
    </Container>
  );
};

export default withAuth(ProfilePage);
