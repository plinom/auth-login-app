import { FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  message: string;
  sender: string;
}

const socket: Socket = io('http://localhost:3001');

export const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [sender, setSender] = useState<string>('User');
  const [room, setRoom] = useState<string>('general');

  useEffect(() => {
    socket.emit('joinRoom', { room });

    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leaveRoom', { room });
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    if (input.trim()) {
      const messageData: Message = { message: input, room, sender };
      socket.emit('message', messageData);
      setInput('');
    }
  };

  const changeRoom = (newRoom: string) => {
    socket.emit('leaveRoom', { room });
    setRoom(newRoom);
    socket.emit('joinRoom', { room: newRoom });
    setMessages([]);
  };

  return (
    <>
      <h1>Chat App</h1>
      <div>
        <label>Room: </label>
        <select onChange={(e) => changeRoom(e.target.value)} value={room}>
          <option value='general'>General</option>
          <option value='room1'>Room 1</option>
          <option value='room2'>Room 2</option>
        </select>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder='Type a message...'
        type='text'
        value={input}
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
};
