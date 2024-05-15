import { io } from 'socket.io-client';

export const initSocket = async () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL?.toString(); // Use optional chaining
  if (!url) {
    throw new Error('REACT_APP_BACKEND_URL environment variable not set.');
  }

  const options = {
    'force new connection': true,
    reconnectionAttempt: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  };
  return io(url, options);
};