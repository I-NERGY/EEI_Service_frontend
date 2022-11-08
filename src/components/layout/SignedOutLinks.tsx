import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import {Location, NavigateFunction} from "react-router-dom";

interface Props {
    navigate: NavigateFunction,
    location: Location,
}

const SignedOutLinks = ({navigate, location}: Props) => {
    return (
        <React.Fragment>
            <ListItemButton
                onClick={() => navigate('/signin')} key={'SignIn'}
                className={location.pathname === '/signin' ? 'menuItemActive' : ''}
            >
                <ListItemIcon>{<LoginOutlinedIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'SignIn'}></ListItemText>
            </ListItemButton>
            {/*<ListItem*/}
            {/*    onClick={() => navigate('/signup')}*/}
            {/*    button key={'Sign Up'}*/}
            {/*    className={location.pathname === '/signup' ? 'menuItemActive' : null}*/}
            {/*>*/}
            {/*    <ListItemIcon>{<AppRegistrationOutlinedIcon color="secondary"/>}</ListItemIcon>*/}
            {/*    <ListItemText primary={'Sign Up'}></ListItemText>*/}
            {/*</ListItem>*/}
        </React.Fragment>
    );
}

export default SignedOutLinks;