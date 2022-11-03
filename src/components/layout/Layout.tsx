import React, {ReactNode} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import {Link, useNavigate, useLocation} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const drawerWidth = 260;

interface Props {
    children?: ReactNode
}

export default function Layout({children}: Props) {
    const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme}) => ({
        flexGrow: 1, // padding: theme.spacing(3),
        paddingTop: theme.spacing(3), paddingBottom: theme.spacing(3), transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }), marginLeft: `0px`, ...(mobileOpen && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
            }), marginLeft: drawerWidth,
        }),
    }),);
    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1), // necessary for content to be below app bar
        ...theme.mixins.toolbar, minHeight: '40px !important', justifyContent: 'flex-end',
    }));

    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navItems = [
        {title: 'Homepage', icon: <HomeOutlinedIcon sx={{color: theme.palette.primary.main}}/>, path: '/'},
        {title: 'Service Title', icon: <SettingsOutlinedIcon sx={{color: theme.palette.primary.main}}/> , path: '/servicePath'}
    ];

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const drawer = (
        <Box sx={{textAlign: 'center'}}>
            <DrawerHeader>
                <img src="/images/i-nergy_logo_trans_back.png" alt="" height={'60px'} style={{objectFit: 'cover'}}/>
                <IconButton onClick={handleDrawerToggle}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding
                              sx={{
                                  background: location.pathname === item.path ? 'linear-gradient(270deg, rgba(151,169,77,1) 60%, rgba(255,255,255,1) 100%)' : '',
                                  border: location.pathname === item.path ? '1px solid rgba(151,169,77,1)' : '',
                                  borderRadius:'10px', margin: 1, width: '95%'
                              }}>
                        <ListItemButton onClick={() => navigate(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={
                                <Typography fontWeight={500} fontSize={18} align={'center'} color={location.pathname === item.path ? 'white' : 'normal'}>
                                    {item.title}
                                </Typography>}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar component="nav" sx={{
                background: theme.palette.background.default, ...(mobileOpen && {
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: `${drawerWidth}px`,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
                    }),
                }),
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: mobileOpen ? 'none' : 'block'}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        UC13 Dashboard
                    </Typography>
                    {/*<Box sx={{ display: { xs: 'none', sm: 'block' } }}>*/}
                    {/*    {navItems.map((item) => (*/}
                    {/*        <Button key={item} sx={{ color: '#fff' }}>*/}
                    {/*            {item}*/}
                    {/*        </Button>*/}
                    {/*    ))}*/}
                    {/*</Box>*/}
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    hideBackdrop={true}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Main style={{overflow: 'hidden', paddingBottom: 0}}>
                <Toolbar/>
                <Box component="main" sx={{p: 3}}>
                    {children}
                </Box>
            </Main>
        </Box>
    );
}
