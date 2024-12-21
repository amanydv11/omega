
import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
const initialState = {
    socket: null,
    onlineUsers: [],
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket(state, action) {
            state.socket = action.payload;
        },
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },
        clearSocket(state) {
            state.socket = null;
            state.onlineUsers = [];
        },
    },
});

export const { setSocket, setOnlineUsers, clearSocket } = socketSlice.actions;

export const initializeSocket = (userId) => (dispatch) => {
    const socket = io('http://localhost:5000', {
        query: { userId },
    });

    socket.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
    });

    socket.on('newMessage', (message) => {
        console.log('New message received:', message);
    });

    dispatch(setSocket(socket));

    return socket;
};

export const closeSocket = (socket) => (dispatch) => {
    if (socket) {
        socket.close();
        dispatch(clearSocket());
    }
};

export default socketSlice.reducer;
