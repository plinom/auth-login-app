'use client';

// import { Chat } from '@/src/components/chat.component';
// import { Test } from '@/src/components/test.component';
import { withAuth } from '@/src/hocs/with-auth.hoc';
import { IRoom } from '@/src/interfaces/room.interface';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [roomName, setRoomName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    console.log(token, user.email);
    fetchRooms('');
  }, [token, user.email]);

  const fetchRooms = async (query: string) => {
    try {
      const response = await fetch(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/rooms?q=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        },
      );

      const data = await response.json();
      setRooms(data);
    } catch (err) {
      console.error('Error', err);
      setRooms([]);
    }
  };

  const addRoom = async () => {
    await fetch(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/rooms`,
      {
        body: JSON.stringify({ name: roomName }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    setRoomName('');
    fetchRooms('');
  };

  const joinRoom = (room: IRoom) => {
    router.push(`chat-room?room=${room._id}`);
  };
  return (
    <Container>
      <Typography variant='h4'>Select Room</Typography>
      <TextField
        fullWidth
        label='Search Room'
        onChange={(e) => fetchRooms(e.target.value)}
        variant='outlined'
      />
      <List>
        {rooms.map((room) => (
          <ListItem key={room._id}>
            <div onClick={() => joinRoom(room)} style={{ cursor: 'pointer' }}>
              <ListItemText primary={room.name} />
            </div>
          </ListItem>
        ))}
      </List>
      <TextField
        label='Add Room'
        onChange={(e) => setRoomName(e.target.value)}
        value={roomName}
        variant='outlined'
      />
      <Button
        color='primary'
        disabled={!roomName}
        onClick={addRoom}
        variant='contained'
      >
        Add Room
      </Button>
    </Container>
  );
};

export default withAuth(Page);
