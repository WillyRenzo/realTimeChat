const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = 3333;

const router = require('./routes');

const app = express();
//Basic to make this socket server works
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {

    //Join SOCKET
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});

        if(error) return callback(error);

        //Join the user in a room
        socket.join(user.room);

        socket.emit('message', { user: 'admin' , text: `${user.name}, welcome to the room ${user.room}`});
        
        //Send to everyone except yourself
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!!!`});

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    //Disconnect SOCKET
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
        }
        
    });
});


server.listen(3333, 
    () => console.log(`Server has started on port ${PORT}`));
