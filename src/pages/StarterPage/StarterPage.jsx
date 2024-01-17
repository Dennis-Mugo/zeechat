import { Button, LinearProgress } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatteContext } from '../../config/context';
import CustomColors from '../../config/colors';
import Logo from '../../components/Logo/Logo';
import "./StarterPage.css";

function StarterPage(props) {
    const { currentUser, setCurrentUser, fetchUser } = useContext(ChatteContext);
    const navigate = useNavigate();

    
    useEffect(() => {
        handleStart();
    })

    const handleStart = async () => {
        let user = await fetchUser();
        if (user) {
            setCurrentUser(user);
            navigate("/chat");
        } else {
            navigate("/home");
        }
    }

    return (
        <div className='starter_container flex_center'>
            <div className='starter_wrapper'>
                <Logo style={{textAlign: "center", margin: "20px 0", fontSize: "2.5rem"}} />
                <div style={{color: CustomColors.deepPurple}}>
                <LinearProgress color="inherit" />
                </div>
                
            </div>
            
        </div>
    );
}

export default StarterPage;