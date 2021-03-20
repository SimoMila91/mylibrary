import React, { useState, useContext } from 'react';
import {
    Typography, Button, AppBar, Toolbar, IconButton, makeStyles,
    Dialog, DialogContentText, DialogContent, Snackbar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import '../App.css';
import logoBook from '../images/logoBook.png';
import NavbarContent from './NavbarContent';
import Login from './signInUp/Login';
import SignUp from './signInUp/SignUp';
import { Context } from '../context/Context';

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

    const { reSetSnackbar, snackOpen } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [selectedForm, setForm] = useState('Signup');


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

    const renderForm = () => {
        if (selectedForm === 'Signup') {
            return (
                <div>
                    <SignUp handleClose={handleClose} className={classes.formStyle} />
                    <DialogContent style={{ textAlign: 'center', paddingBottom: 5 }}>
                        <DialogContentText>
                            Do you have an account?
                            <a href="/#" onClick={formChange}> Login</a>
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
                        <a href="/#" onClick={formChange}> Signup</a>
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
                message={<span id="message-id">User registered successfully!</span>}
            />
        </div>

    );
};
