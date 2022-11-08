import React from 'react';
import {
    NavigateFunction,
    Location
} from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

interface Props {
    navigate: NavigateFunction,
    location: Location,
    handleSignOut: () => any
}

const SignedInLinks = ({navigate, location, handleSignOut}: Props) => {
    return (
        <>
            <ListItemButton
                onClick={() => navigate('/user/profile')}
                key={'My Profile'}
                className={location.pathname === '/user/profile' ? 'menuItemActive' : ''}
            >
                <ListItemIcon>{<AccountCircleIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'My Profile'}></ListItemText>
            </ListItemButton>

            <ListItemButton
                onClick={handleSignOut}
                key={'Sign Out'}
            >
                <ListItemIcon>{<LogoutOutlinedIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'Sign Out'}></ListItemText>
            </ListItemButton>
        </>
    );
}

export default SignedInLinks;