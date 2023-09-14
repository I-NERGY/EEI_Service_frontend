import React, {useContext} from 'react';
import {
    NavigateFunction,
    Location
} from 'react-router-dom';
import {LanguageContext} from "../../context/LanguageContext";
import {multilingual} from "../../multilingual";

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Typography from "@mui/material/Typography";

interface Props {
    navigate: NavigateFunction,
    location: Location,
    handleSignOut: () => any
}

const SignedInLinks = ({navigate, location, handleSignOut}: Props) => {
    const {language} = useContext(LanguageContext)
    let dictionary = language === 'en' ? multilingual.english : multilingual.latvian

    return (
        <>
            <ListItem disablePadding
                      className={location.pathname === '/user/profile' ? 'menuItemActive' : ''}
                      sx={{
                          borderRadius: '10px !important', margin: 1, width: '95%'
                      }}>
                <ListItemButton onClick={() => navigate('/user/profile')}>
                    <ListItemIcon>{<AccountCircleIcon color="secondary"/>}</ListItemIcon>
                    <ListItemText primary={
                        <Typography fontWeight={500} fontSize={17} align={'left'}
                                    color={location.pathname === '/user/profile' ? 'white' : 'normal'}>
                            {dictionary.layout.menuItem4}
                        </Typography>}/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding
                      sx={{
                          borderRadius: '10px !important', margin: 1, width: '95%'
                      }}>
                <ListItemButton onClick={handleSignOut}>
                    <ListItemIcon>{<LogoutOutlinedIcon color="secondary"/>}</ListItemIcon>
                    <ListItemText primary={
                        <Typography fontWeight={500} fontSize={17} align={'left'}>
                            {dictionary.layout.menuItem5}
                        </Typography>}/>
                </ListItemButton>
            </ListItem>
        </>
    );
}

export default SignedInLinks;