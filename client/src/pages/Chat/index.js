import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './styles.css';

import InfoBar from '../InfoBar';
import Input from '../Input';
import Messages from '../Messages';

let socket;

export default function Chat({ location }){
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const ENDPOINT = 'http://localhost:3333';

    useEffect(() => {
        //Searching for the query params
        const { name, room } = queryString.parse(location.search);

        socket = io('http://localhost:3333');
        
        setName(name);
        setRoom(room);

        //Third Params of Emit is a callback function!
        socket.emit('join', { name, room }, ( error ) => {
            if(error) {
                alert(error);
            }
        });

        //Happens on Unmount of the Component!
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([... messages, message]);
        })
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    };

    console.log(message, messages);
    

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    );
}