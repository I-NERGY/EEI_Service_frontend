import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import {Location, NavigateFunction} from "react-router-dom";
import Typography from "@mui/material/Typography";

interface Props {
    navigate: NavigateFunction,
    location: Location,
}

const SignedOutLinks = ({navigate, location}: Props) => {
    return (
        <>
            <ListItem disablePadding
                      className={location.pathname === '/signin' ? 'menuItemActive' : ''}
                      sx={{
                          borderRadius: '10px !important', margin: 1, width: '95%'
                      }}>
                <ListItemButton
                    onClick={() => navigate('/signin')} key={'SignIn'}
                >
                    <ListItemIcon>{<LoginOutlinedIcon color="secondary"/>}</ListItemIcon>
                    <ListItemText primary={
                        <Typography fontWeight={500} fontSize={17} align={'center'}>
                            {'Sign In'}
                        </Typography>}/>
                </ListItemButton>
            </ListItem>
            {/*<ListItem*/}
            {/*    onClick={() => navigate('/signup')}*/}
            {/*    button key={'Sign Up'}*/}
            {/*    className={location.pathname === '/signup' ? 'menuItemActive' : null}*/}
            {/*>*/}
            {/*    <ListItemIcon>{<AppRegistrationOutlinedIcon color="secondary"/>}</ListItemIcon>*/}
            {/*    <ListItemText primary={'Sign Up'}></ListItemText>*/}
            {/*</ListItem>*/}
        </>
    );
}

export default SignedOutLinks;