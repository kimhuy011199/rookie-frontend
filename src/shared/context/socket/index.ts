import { createContext } from 'react';
import io from 'socket.io-client';
import { BASE_SOCKET_URL } from '../../constants/constants';

export const socket = io(BASE_SOCKET_URL);
export const SocketContext = createContext(socket);
