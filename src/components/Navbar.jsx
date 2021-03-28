import React, { useState, useContext } from 'react';
import {
    Typography, Button, AppBar, Toolbar, IconButton, makeStyles,
    Dialog, DialogContentText, DialogContent, Snackbar, Menu,
    MenuItem, Link
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { NavLink } from 'react-router-dom';
import '../App.css';
import logoBook from '../images/logoBook.png';
import NavbarContent from './NavbarContent';
import Login from './logRegLog/Login';
import SignUp from './logRegLog/SignUp';
import { Context } from '../context/Context';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Alert } from '@material-ui/lab';

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

    const { reSetSnackbar, snackOpen, loggedIn, handleOpenForm, open, handleCloseForm } = useContext(Context);
    const [selectedForm, setForm] = useState('Login');
    const [anchorEl, setAnchorEl] = useState(null);
    const openmenu = Boolean(anchorEl);

    const formChange = (e) => {
        e.preventDefault();
        if (selectedForm === 'Signup')
            setForm('Login');
        else
            setForm('Signup');
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
                    <SignUp handleClose={handleCloseForm} className={classes.formStyle} />
                    <DialogContent style={{ textAlign: 'center', paddingBottom: 5 }}>
                        <DialogContentText>
                            Do you have an account?
                            <Link href="#" style={{textDecoration: 'none', color: '#007bff'}} onClick={formChange}> Login</Link>
                        </DialogContentText>
                    </DialogContent>
                </div>
            )
        } else {
            return (
                <div>
                    <Login handleClose={handleCloseForm} />
                    <DialogContent style={{ textAlign: 'center', paddingBottom: 5 }}>
                        <DialogContentText>
                            Don't you have an account?
                        <Link href="#" style={{textDecoration: 'none', color: '#007bff'}} onClick={formChange}> Signup</Link>
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
                    <IconButton component={NavLink} to="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img className={classes.logoStyle} src={`${logoBook}`} alt="logo" />
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        My Library
                    </Typography>
                    <Typography className={classes.notVisible}></Typography>
                    {
                        loggedIn ?
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
                        </>
                        :
                        <>
                            <Button className={classes.button} variant="outlined" onClick={handleOpenForm} color="inherit">SIGN IN / SIGN UP</Button>
                            <Dialog
                                justify="center"
                                maxWidth="xl"
                                open={open}
                                onClose={handleCloseForm}
                                aria-labelledby="form-dialog-title"
                            >
                                <IconButton
                                    color="inherit"
                                    onClick={handleCloseForm}
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
            >
                <Alert severity={snackOpen.type}>{snackOpen.message}</Alert>
            </Snackbar>
        </div>
    );
};
