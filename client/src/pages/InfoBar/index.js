import React from 'react';
import './styles.css';


import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

export default function Infobar({ room }){
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} className="onlineIcon" alt="Online"/>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="Close"/></a>
            </div>
        </div>
    );
}