import React, {ReactNode, useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {styled, useTheme} from '@mui/material/styles';
import useAuthContext from "../../hooks/useAuthContext";
import {useLogout} from "../../hooks/useLogout";

import {appbarMenuButtonItems} from "../../appbarMenuButtonItems";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import MenuButton from "./MenuButton";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import FooterContent from "./FooterContent";

const drawerWidth = 260;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Footer = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface Props {
    children?: ReactNode
}

export default function PersistentDrawerLeft({children}: Props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const {user, roles} = useAuthContext()
    const {logout} = useLogout()

    const navigate = useNavigate()
    const location = useLocation()

    const handleDrawerToggle = () => setOpen(!open);

    const handleSignOut = () => {
        logout()
        setMenu(navItems)
        navigate('/signin')
    }

    interface navItem {
        title: string,
        icon: ReactNode,
        path: string
    }

    const navItems = [
        {title: 'Homepage', icon: <HomeOutlinedIcon sx={{color: theme.palette.primary.main}}/>, path: '/'},

    ];

    useEffect(() => {
        if (user) {
            navItems.push(
                {
                    title: 'Service Title',
                    icon: <SettingsOutlinedIcon sx={{color: theme.palette.primary.main}}/>,
                    path: '/servicePath'
                }
            )
            setMenu(navItems)
        }
    }, [user])

    const [menu, setMenu] = useState<navItem[]>(navItems)

    const drawer = (
        <Box sx={{textAlign: 'center', minHeight: '100vh'}}>
            <DrawerHeader>
                <img src="/images/i-nergy_logo_trans_back.png" alt="" height={'60px'} style={{objectFit: 'cover'}}/>
                <IconButton onClick={handleDrawerToggle}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                {menu.map((item) => (
                    <ListItem key={item.path} disablePadding
                              sx={{
                                  background: location.pathname === item.path ? 'linear-gradient(270deg, rgba(151,169,77,1) 55%, rgba(255,255,255,1) 100%)' : '',
                                  border: location.pathname === item.path ? '1px solid rgba(151,169,77,1)' : '',
                                  borderRadius: '10px', margin: 1, width: '95%'
                              }}>
                        <ListItemButton onClick={() => navigate(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={
                                <Typography fontWeight={500} fontSize={17} align={'center'}
                                            color={location.pathname === item.path ? 'white' : 'normal'}>
                                    {item.title}
                                </Typography>}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {!user && <SignedOutLinks navigate={navigate} location={location}/>}
                {user && <SignedInLinks navigate={navigate} location={location} handleSignOut={handleSignOut}/>}
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{display: 'flex', minHeight: `calc(100vh - 60px)`, border: "1px solid red"}}>
                <CssBaseline/>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                            sx={{mr: 2, color: 'white', ...(open && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h5" noWrap component="div" color={'white'} fontWeight={'bold'}>
                            I-NERGY UC13 Dashboard
                        </Typography>
                        {user && <React.Fragment>
                            <Typography
                                style={{marginLeft: 'auto', color: 'white'}}>Welcome, {user.username}</Typography>
                            <MenuButton subLinks={appbarMenuButtonItems} signout={handleSignOut}/>
                        </React.Fragment>}
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    {drawer}
                </Drawer>
                <Main open={open}>
                    <DrawerHeader/>
                    {children}
                </Main>
            </Box>
            <Footer open={open} sx={{position: 'sticky', mt: 'auto'}}><FooterContent/></Footer>
        </>
    );
}