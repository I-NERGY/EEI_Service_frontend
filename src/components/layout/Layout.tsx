import React, {ReactNode, useEffect, useState, useContext} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {styled, useTheme} from '@mui/material/styles';
import {useLogout} from "../../hooks/useLogout";
import {useKeycloak} from "@react-keycloak/web";
import {LanguageContext} from "../../context/LanguageContext";

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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';

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
    background: theme.palette.background.default
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
    background: theme.palette.background.default
}));

interface Props {
    children?: ReactNode
}

export default function PersistentDrawerLeft({children}: Props) {
    const {keycloak, initialized} = useKeycloak();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { language, changeLanguage } = useContext(LanguageContext);

    const handleChange = (event: SelectChangeEvent) => {
        changeLanguage(event.target.value);
    };

    const {logout} = useLogout()

    const navigate = useNavigate()
    const location = useLocation()

    const handleDrawerToggle = () => setOpen(!open);

    const handleSignOut = () => {
        logout()
        keycloak.logout()
        setMenu(navItems)
        // navigate('/signin')
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
        let roles = keycloak.realmAccess?.roles

        if (roles && roles?.length > 0) {
            navItems.push(
                {
                    title: 'Plan Investment',
                    icon: <EngineeringOutlinedIcon sx={{color: theme.palette.primary.main}}/>,
                    path: '/building-info'
                }
            )
            setMenu(navItems)
        }

        if (roles && roles?.includes('inergy_admin')) {
            navItems.push(
                {
                    title: 'Energy Measures Admin page',
                    icon: <SettingsOutlinedIcon sx={{color: theme.palette.primary.main}}/>,
                    path: '/energy-measures/edit'
                }
            )
            setMenu(navItems)
        }

    }, [initialized])

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
                                <Typography fontWeight={500} fontSize={17} align={'left'}
                                            color={location.pathname === item.path ? 'white' : 'normal'}>
                                    {item.title}
                                </Typography>}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {!keycloak.authenticated && <SignedOutLinks navigate={navigate} location={location}/>}
                {keycloak.authenticated &&
                    <SignedInLinks navigate={navigate} location={location} handleSignOut={handleSignOut}/>}
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{display: 'flex', minHeight: `calc(100vh - 60px)`}}>
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
                        <Typography variant="h6" noWrap component="div" color={'white'} fontWeight={'bold'}>
                            I-NERGY UC13 Dashboard
                        </Typography>
                        {keycloak.authenticated === true && <React.Fragment>
                            <FormControl sx={{ ml: 'auto', minWidth: 120}} size="small" className={'language'}>
                                <InputLabel id="demo-select-small-label">Language</InputLabel>
                                <Select
                                    sx={{
                                        color: "white",
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 1)',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 1)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 1)',
                                        },
                                        '.MuiSvgIcon-root ': {
                                            fill: "white !important",
                                        }
                                    }}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={language}
                                    label="Language"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'en'}>English</MenuItem>
                                    <MenuItem value={'lat'}>Latvian</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography
                                style={{
                                    marginLeft: '20px',
                                    color: 'white'
                                }}>Welcome, {keycloak?.tokenParsed?.preferred_username}</Typography>
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