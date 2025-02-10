'use client';

import { withAuth } from '@/src/hocs/with-auth.hoc';
import { IMessage } from '@/src/interfaces/message.interface';
import { Button, Container, TextField, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(`http://${process.env.API_HOST}:${process.env.API_PORT}`);

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    console.log(token, user.email);

    socket.emit('enter-chat-room', { roomId: roomId, userId: user.uid });

    socket.on('message', (newMessage: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.emit('leave-chat-room', { roomId: roomId, userId: user.uid });
      setMessage('');
    };
  }, [roomId, token, user.email, user.uid]);

  const sendMessage = () => {
    socket.emit('add-message', {
      room: roomId,
      text: message,
      userId: user.uid,
    });
  };

  return (
    <Container>
      <Typography variant='h4'>Room: {roomId}</Typography>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{user.uid}:</strong> {msg.text}
        </div>
      ))}
      <TextField
        fullWidth
        label='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        variant='outlined'
      />
      <Button disabled={!message} onClick={sendMessage} variant='contained'>
        Send
      </Button>
    </Container>
  );
};

export default withAuth(Page);
