import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

export default function Chat({ location }){
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const ENDPOINT = 'localhost:3333';

    useEffect(() => {
        //Searching for the query params
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);
        
        setName(name);
        setRoom(room);

        //Third Params of Emit is a callback function!
        socket.emit('join', { name, room }, ({ error }) => {
            alert(error);
        });

        //Happens on Unmount of the Component!
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    return(
        <h1>Chat</h1>
    );
}