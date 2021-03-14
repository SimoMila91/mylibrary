import React from 'react';
import { Typography, Button, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../App.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import logoBook from '../images/logoBook.png';
import NavbarContent from './NavbarContent';

const font = "'Satisfy', cursive";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    buttonMarg: {
        marginLeft: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        fontFamily: font,
    },
    customizeToolbar: {
        maxHeight: 36,
    },
    style: {
        background: '#dfe0d7',
        color: '#000',

    },
    logoStyle: {
        maxHeight: 50,
    },
}));


export default function Navbar() {
    const classes = useStyles();

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
                    <IconButton
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        style={{ marginLeft: 'auto' }}
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit"><TwitterIcon /></IconButton>
                    <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit"><InstagramIcon /></IconButton>
                    <Button variant="outlined" color="inherit">SIGN IN / SIGN UP</Button>
                </Toolbar>
            </AppBar>
            <NavbarContent />
        </div>

    );
};