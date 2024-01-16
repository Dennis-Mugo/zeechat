import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function StarterPage(props) {
    const navigate = useNavigate();

    return (
        <div>
            StarterPage
            <Button onClick={() => {navigate("/signup")}}>Signup</Button>
        </div>
    );
}

export default StarterPage;