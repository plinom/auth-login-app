'use client';

import { socket } from '@/src/configs/socket.config';
import { withAuth } from '@/src/hocs/with-auth.hoc';
import { IMessage } from '@/src/interfaces/message.interface';
import { Button, Container, TextField, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleNewMessage = useCallback((newMessage: IMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleExistingMessages = useCallback((existingMessages: IMessage[]) => {
    setMessages(existingMessages);
  }, []);

  useEffect(() => {
    if (!roomId) return;
    console.log(token, user.email, roomId);

    socket.emit('enter-chat-room', { firebaseId: user.uid, roomId: roomId });

    socket.on('message', handleNewMessage);
    socket.on('existing-messages', handleExistingMessages);

    return () => {
      socket.off('message', handleNewMessage);
      socket.off('existing-messages', handleExistingMessages);
      socket.emit('leave-chat-room', { firebaseId: user.uid, roomId: roomId });
      setMessages([]);
    };
  }, [
    handleExistingMessages,
    handleNewMessage,
    roomId,
    token,
    user.email,
    user.uid,
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit('add-message', {
      firebaseId: user.uid,
      roomId: roomId,
      text: message,
    });
    setMessage('');
  };

  return (
    <Container>
      <Typography variant='h4'>Room: {roomId}</Typography>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.ownerId}:</strong> {msg.text}
        </div>
      ))}
      <TextField
        fullWidth
        label='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        variant='outlined'
      />
      <Button
        disabled={!message.trim()}
        onClick={sendMessage}
        variant='contained'
      >
        Send
      </Button>
    </Container>
  );
};

export default withAuth(Page);
