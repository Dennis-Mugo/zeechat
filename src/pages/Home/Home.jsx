import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <div>
            <Button onClick={() => {handleNavigate("signup")}}>signup</Button>
        </div>
    );
}

export default Home;