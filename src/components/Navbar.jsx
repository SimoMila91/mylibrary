import React, { useState, useContext, useEffect } from 'react';
import {
    Typography, Button, AppBar, Toolbar, IconButton, makeStyles,
    Dialog, DialogContentText, DialogContent, Snackbar, Menu,
    MenuItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
import logoBook from '../images/logoBook.png';
import NavbarContent from './NavbarContent';
import Login from './signInUp/Login';
import SignUp from './signInUp/SignUp';
import { Context } from '../context/Context';
import AccountCircle from '@material-ui/icons/AccountCircle';

const font = "'Satisfy', cursive";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        fontFamily: font,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    customizeToolbar: {
        maxHeight: 60,
        minHeight: 46,
    },
    style: {
        background: '#dfe0d7',
        color: '#000',

    },
    logoStyle: {
        maxHeight: 50,
    },
    button: {
        position: 'absolute',
        right: 10,
    },
    notVisible: {
        flexGrow: 1,
    },
    dialogStyle: {
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            padding: '0 4rem',
        },
        maxWidth: 600,
        textAlign: 'center',
    },
}));


export default function Navbar() {
    const classes = useStyles();

    const { reSetSnackbar, snackOpen, message, loggedIn } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [selectedForm, setForm] = useState('Signup');
    const [anchorEl, setAnchorEl] = useState(null);
    const openmenu = Boolean(anchorEl);


    const handleOpen = () => {
        setOpen(true);
    };

    const formChange = () => {
        if (selectedForm === 'Signup')
            setForm('Login');
        else
            setForm('Signup');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(false);
    };

    const renderForm = () => {
        if (selectedForm === 'Signup') {
            return (
                <div>
                    <SignUp handleClose={handleClose} className={classes.formStyle} />
                    <DialogContent style={{ textAlign: 'center', paddingBottom: 5 }}>
                        <DialogContentText>
                            Do you have an account?
                            <a href="#" onClick={formChange}> Login</a>
                        </DialogContentText>
                    </DialogContent>
                </div>
            )
        } else {
            return (
                <div>
                    <Login handleClose={handleClose} />
                    <DialogContent style={{ textAlign: 'center', paddingBottom: 5 }}>
                        <DialogContentText>
                            Don't you have an account?
                        <a href="#" onClick={formChange}> Signup</a>
                        </DialogContentText>
                    </DialogContent>
                </div>
            )
        }
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.style} position="static">
                <Toolbar className={classes.customizeToolbar} >
                    <IconButton component={Link} to="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img className={classes.logoStyle} src={`${logoBook}`} alt="logo" />
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        My Library
                    </Typography>
                    <Typography className={classes.notVisible}></Typography>
                    {loggedIn ?
                        <>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="account-menu"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="account-menu"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                open={openmenu}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>My profile</MenuItem>
                                <MenuItem onClick={handleMenuClose}><NavLink to="/logout" style={{ color: '#212529', textDecoration: 'none' }}>Logout</NavLink></MenuItem>
                            </Menu>
                        </> :
                        <>
                            <Button className={classes.button} variant="outlined" onClick={handleOpen} color="inherit">SIGN IN / SIGN UP</Button>
                            <Dialog
                                justify="center"
                                maxWidth="xl"
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="form-dialog-title"
                            >
                                <IconButton
                                    color="inherit"
                                    onClick={handleClose}
                                    justify="flex-end"
                                    className={classes.button}
                                >
                                    <CloseIcon
                                        style={{
                                            fontSize: '1.8rem',
                                            color: 'grey',
                                        }}
                                    />
                                </IconButton>
                                {renderForm()}
                            </Dialog>
                        </>


                    }


                </Toolbar>
            </AppBar>
            <NavbarContent />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackOpen}
                autoHideDuration={5000}
                onClose={reSetSnackbar}
                message={message}
            />
        </div>

    );
};
