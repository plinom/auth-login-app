import io from 'socket.io-client';

export const socket = io(
  `http://${process.env.API_HOST}:${process.env.API_PORT}`,
);
