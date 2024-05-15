const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave',
    COMPILE_CODE: 'compile-code',
    CHANGE_LANGUAGE: 'change-language',
    CREATE_NEW_FILE: 'create-new-file',
    RENAME_FILE_TITLE: 'rename-file-title'
};


const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code, id }) => {
        
        io.to(roomId).emit(ACTIONS.CODE_CHANGE, { code, id});
        console.log(code)
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code, id }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code , id});
        console.log('sync')
    });

    socket.on(ACTIONS.CHANGE_LANGUAGE, ({ roomId, language }) => {
        io.to(roomId).emit(ACTIONS.CHANGE_LANGUAGE, { language });
        // console.log(code)
    });

    socket.on(ACTIONS.CREATE_NEW_FILE, ({ roomId, id }) => {
        console.log('creat new code')
        io.to(roomId).emit(ACTIONS.CREATE_NEW_FILE, {id});
        // console.log(code)
    });

    socket.on(ACTIONS.RENAME_FILE_TITLE, ({ roomId, id, title }) => {
        console.log(roomId, id, title)
        io.to(roomId).emit(ACTIONS.RENAME_FILE_TITLE, {id, title});
        // console.log(code)
    });

    socket.on(ACTIONS.COMPILE_CODE, ({ roomId }) => {
        io.to(roomId).emit(ACTIONS.COMPILE_CODE);
        // socket.in(roomId).emit(ACTIONS.COMPILE_CODE);
        // io.to(roomId).emit(ACTIONS.COMPILE_CODE);
        console.log(roomId)
        console.log('compile code')
    });

    

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
