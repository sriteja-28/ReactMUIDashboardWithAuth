import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Menu,
    MenuItem,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import TaskIcon from '@mui/icons-material/Task';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const Dashboard = () => {
    const [mode, setMode] = useState('light');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };


    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };


    const theme = createTheme({
        palette: {
            mode: mode,
            primary: {
                main: mode === 'dark' ? '#90caf9' : '#1976d2',
            },
            background: {
                default: mode === 'dark' ? '#303030' : '#fafafa',
                paper: mode === 'dark' ? '#424242' : '#ffffff',
            },
        },
    });


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const drawerContent = (
        <Box sx={{ width: 150}}>
            <List>
                <ListItem
                    button
                    onClick={() => {
                        navigate('/dashboard/home');
                        setDrawerOpen(false);
                    }}
                >
                    {/* <ListItemText primary="Home" /> */}
                    <ListItemText primary={<HomeIcon/>} />
                </ListItem>
                <Divider />
                <ListItem
                    button
                    onClick={() => {
                        navigate('/dashboard/about');
                        setDrawerOpen(false);
                    }}
                >
                   {/* <ListItemText primary="About" /> */}
                    <ListItemText primary={<InfoIcon/>} />
                </ListItem>
                <Divider />
                <ListItem
                    button
                    onClick={() => {
                        navigate('/dashboard/tasks');
                        setDrawerOpen(false);
                    }}
                >
                    {/* <ListItemText primary="Tasks" /> */}
                    <ListItemText primary={<TaskIcon/>} />

                </ListItem>
                <Divider />
                <ListItem
                    button
                    onClick={() => {
                        navigate('/dashboard/userActivity');
                        setDrawerOpen(false);
                    }}
                >
                    {/* <ListItemText primary="UserActivity" /> */}
                    <ListItemText primary={<HourglassEmptyIcon/>} />
                </ListItem>
                <Divider />
                <ListItem
                    button
                    onClick={() => {
                        navigate('/dashboard/taskmanager');
                        setDrawerOpen(false);
                    }}
                >
                    {/* <ListItemText primary="UserActivity" /> */}
                    <ListItemText primary={<HourglassEmptyIcon/>} />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            sx={{ mr: 2 }}
                        >
                            <MenuOpenIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={toggleTheme}>
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>


                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>


                <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    {drawerContent}
                </Drawer>


                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Dashboard;
