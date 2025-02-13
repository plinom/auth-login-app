'use client';

import { socket } from '@/src/configs/socket.config';
import { withAuth } from '@/src/hocs/with-auth.hoc';
import { IRoom } from '@/src/interfaces/room.interface';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [roomName, setRoomName] = useState<string>('');
  const router = useRouter();

  const addRoom = useCallback(() => {
    if (!roomName.trim()) return;
    socket.emit('add-room', { firebaseId: user.uid, name: roomName });
    setRoomName('');
  }, [roomName, user.uid]);

  const joinRoom = useCallback(
    (room: IRoom) => {
      router.push(`chat-room?room=${room._id}`);
    },
    [router],
  );

  useEffect(() => {
    console.log(token, user.email);
    socket.emit('fetch-rooms');
    const handleRoomsList = (rooms: IRoom[]) => setRooms(rooms);
    socket.off('rooms-list', handleRoomsList).on('rooms-list', handleRoomsList);
    return () => {
      socket.off('rooms-list', handleRoomsList);
    };
  }, [token, user.email]);

  return (
    <Paper elevation={3} sx={{ margin: 'auto', padding: 2 }}>
      <List>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <ListItem
              key={room._id}
              onClick={() => joinRoom(room)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              <ListItemText primary={room.name} />
            </ListItem>
          ))
        ) : (
          <Typography>No rooms available</Typography>
        )}
      </List>
      <TextField
        fullWidth
        label='Add Room'
        onChange={(e) => setRoomName(e.target.value)}
        sx={{ marginY: 2 }}
        value={roomName}
        variant='outlined'
      />
      <Button
        color='primary'
        disabled={!roomName.trim()}
        fullWidth
        onClick={addRoom}
        variant='contained'
      >
        Add Room
      </Button>
    </Paper>
  );
};

export default withAuth(Page);
