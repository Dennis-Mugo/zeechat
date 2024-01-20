import React, { useContext } from 'react';
import "./Chat.css";
import { ChatteContext } from '../../config/context';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import ChatRight from '../../components/ChatRight/ChatRight';
import { mainWidthBreak } from '../../config/constants';

function Chat(props) {
    const navigate = useNavigate();
    const { setCurrentUser, screenWidth } = useContext(ChatteContext);

    

    return (
        <div className='chat_container flex_center'>
            <div className='chat_shadow'>
                {screenWidth > mainWidthBreak ? <Sidebar style={{flex: "30"}} /> : <></>}
                <ChatRight style={{flex: "70"}} />
            </div>
        </div>
    );
}

export default Chat;